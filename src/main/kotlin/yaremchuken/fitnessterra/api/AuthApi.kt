package yaremchuken.fitnessterra.api

import org.apache.commons.lang3.StringUtils
import org.jetbrains.annotations.NotNull
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import yaremchuken.fitnessterra.api.error.InvalidCredentialsException
import yaremchuken.fitnessterra.api.error.UserAlreadyExistsException
import yaremchuken.fitnessterra.api.error.UserNotExistsException
import yaremchuken.fitnessterra.model.RoleType
import yaremchuken.fitnessterra.security.JwtAuthenticationException
import yaremchuken.fitnessterra.security.JwtTokenProvider
import yaremchuken.fitnessterra.service.dao.RoleService
import yaremchuken.fitnessterra.service.UserDetailsService
import yaremchuken.fitnessterra.service.dao.UserService

@RestController
@RequestMapping("api/auth")
class AuthApi(
    private val userService: UserService,
    private val roleService: RoleService,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager,
    private val jwtTokenProvider: JwtTokenProvider,
    private val userDetailsService: UserDetailsService
) {
    @PostMapping("register")
    @ResponseBody
    fun register(@RequestBody @NotNull credentials: UserCredentials): AuthDTO {
        checkCredentialsBlank(credentials)

        val existed = userService.getByUsername(credentials.username)
        if (existed != null) throw UserAlreadyExistsException()

        val refreshToken = jwtTokenProvider.createRefreshToken()

        val user =
            userService.create(
                credentials.username,
                passwordEncoder.encode(credentials.password),
                refreshToken.token,
                refreshToken.issuedAt)

        val role = roleService.create(user, RoleType.USER)

        val accessToken: String = jwtTokenProvider.createAccessToken(credentials.username, mutableListOf(role))

        return AuthDTO(user.id!!, accessToken, refreshToken.token)
    }

    @PostMapping("login")
    @ResponseBody
    fun login(@RequestBody @NotNull credentials: UserCredentials): AuthDTO {
        checkCredentialsBlank(credentials)
        try {
            val userDetails = userDetailsService.loadUserByUsername(credentials.username)
            val authToken = UsernamePasswordAuthenticationToken(userDetails.username, credentials.password, userDetails.authorities)
            authenticationManager.authenticate(authToken)

            val user = userService.getByUsername(credentials.username) ?: throw UserNotExistsException()

            // TODO: Probably where is no need in additional password check
            if (!passwordEncoder.matches(credentials.password, user.password)) {
                throw InvalidCredentialsException("User credentials does not match")
            }

            val accessToken: String = jwtTokenProvider.createAccessToken(credentials.username, user.roles)
            val refreshToken = jwtTokenProvider.createRefreshToken()

            user.refreshToken = refreshToken.token
            user.tokenIssuedAt = refreshToken.issuedAt

            userService.update(user)

            return AuthDTO(user.id!!, accessToken, refreshToken.token)
        } catch (ex: AuthenticationException) {
            throw InvalidCredentialsException(ex.message!!)
        }
    }

    private fun checkCredentialsBlank(credentials: UserCredentials) {
        if (StringUtils.isBlank(credentials.username) || credentials.username.length < 3 ||
            StringUtils.isBlank(credentials.password) || credentials.password.length < 3) {
            throw InvalidCredentialsException()
        }
    }

    @PostMapping("renew-token")
    @ResponseBody
    fun renewToken(@RequestBody @NotNull tokenDTO: RenewTokenDTO): AuthDTO {
        val user = userService.getById(tokenDTO.uid) ?: throw UserNotExistsException()

        if (user.refreshToken != tokenDTO.refreshToken) throw JwtAuthenticationException("Refresh token invalid")

        // TODO: In the best-case scenario, when refresh token is expired user should relogin, but for simplicity just reset token
        if (jwtTokenProvider.refreshTokenExpired(user.tokenIssuedAt)) {
            val refreshToken = jwtTokenProvider.createRefreshToken()
            user.refreshToken = refreshToken.token
            user.tokenIssuedAt = refreshToken.issuedAt
            userService.update(user)
        }

        val accessToken: String = jwtTokenProvider.createAccessToken(user.username, user.roles)

        return AuthDTO(user.id!!, accessToken, user.refreshToken)
    }
}

data class UserCredentials(val username: String, var password: String)

data class AuthDTO(val uid: Long, val accessToken: String, val refreshToken: String? = null)

data class RenewTokenDTO(val uid: Long, val refreshToken: String)
