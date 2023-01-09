package yaremchuken.fitnessterra.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import yaremchuken.fitnessterra.model.Role
import yaremchuken.fitnessterra.service.UserDetailsService
import java.io.Serializable
import java.security.Key
import java.time.Clock
import java.time.Instant
import java.util.Date
import java.util.UUID

@Component
class JwtTokenProvider(
    @Value("\${jwt.secret.key}") private val secretKey: String,
    @Value("\${jwt.token.lifetime.ms:3600000}") private val tokenLifetimeMs: Long,
    @Value("\${jwt.refresh.token.lifetime.ms:86400000000}") private val refreshLifetimeMs: Long,
    private val userDetailsService: UserDetailsService,
    private val clock: Clock
) : Serializable {

    private fun getSigningKey(): Key = Keys.hmacShaKeyFor(secretKey.toByteArray())

    fun createAccessToken(username: String, roles: MutableList<Role>): String {
        val claims: Claims = Jwts.claims().setSubject(username)
        claims["roles"] = roles.map { it.id.role.name }

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(Date())
            .setExpiration(Date.from(Instant.now(clock).plusMillis(tokenLifetimeMs)))
            .signWith(getSigningKey())
            .compact()
    }

    fun createRefreshToken(): RefreshToken = RefreshToken(UUID.randomUUID().toString(), Instant.now(clock))

    fun getAuthentication(token: String): Authentication {
        val username = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).body.subject
        val userDetails = userDetailsService.loadUserByUsername(username)
        return UsernamePasswordAuthenticationToken(userDetails, "", userDetails.authorities)
    }

    fun resolveToken(req: HttpServletRequest): String? {
        val bearerToken = req.getHeader("Authorization")
        return if (bearerToken != null && bearerToken.startsWith("Bearer ")) bearerToken.substring(7, bearerToken.length)
        else null
    }

    fun validateToken(token: String) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).body
        }catch (ex: Exception) {
            throw JwtAuthenticationException(ex.message!!)
        }
    }

    fun refreshTokenExpired(issuedAt: Instant): Boolean =
        issuedAt.plusMillis(refreshLifetimeMs).isBefore(Instant.now(clock))
}

data class RefreshToken(val token: String, val issuedAt: Instant)
