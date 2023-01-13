package yaremchuken.fitnessterra.security

import com.fasterxml.jackson.databind.ObjectMapper
import io.jsonwebtoken.ExpiredJwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletRequest
import jakarta.servlet.ServletResponse
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.GenericFilterBean
import yaremchuken.fitnessterra.api.error.UserNotExistsException

class JwtTokenFilter(private val jwtTokenProvider: JwtTokenProvider) : GenericFilterBean() {

    private val jsonMapper = ObjectMapper().writer().withDefaultPrettyPrinter()

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        val token: String? = jwtTokenProvider.resolveToken(request as HttpServletRequest)
        if (token != null) {
            try {
                jwtTokenProvider.validateToken(token)
                val authentication = jwtTokenProvider.getAuthentication(token)
                if (authentication.isAuthenticated) SecurityContextHolder.getContext().authentication = authentication
            } catch (ex: Exception) {
                when (ex) {
                    is JwtAuthenticationException, is UserNotExistsException -> {
                        val httpResponse = response as HttpServletResponse
                        SecurityContextHolder.clearContext()
                        httpResponse.contentType = "application/json"
                        httpResponse.status = HttpStatus.UNAUTHORIZED.value()
                        httpResponse.writer.println(jsonMapper.writeValueAsString(ex.message))
                        return
                    }
                    else -> throw ex
                }
            }
        }
        chain.doFilter(request, response)
    }
}
