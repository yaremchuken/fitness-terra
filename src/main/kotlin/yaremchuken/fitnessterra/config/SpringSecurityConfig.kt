package yaremchuken.fitnessterra.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import yaremchuken.fitnessterra.security.JwtTokenConfigurer
import yaremchuken.fitnessterra.security.JwtTokenProvider
import yaremchuken.fitnessterra.service.UserDetailsService

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
class SpringSecurityConfig(private val jwtTokenProvider: JwtTokenProvider) {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .cors()
            .and()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .apply(JwtTokenConfigurer(jwtTokenProvider))

        return http.build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration();
        configuration.allowedOrigins = listOf("http://localhost:3000");
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");
        configuration.allowedHeaders = listOf("authorization", "content-type", "x-auth-token");
        configuration.exposedHeaders = listOf("x-auth-token");
        val source = UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun authenticationManager(
        passwordEncoder: PasswordEncoder,
        userDetailsService: UserDetailsService
    ) : AuthenticationManager {
        val daoProvider = DaoAuthenticationProvider()
        daoProvider.setPasswordEncoder(passwordEncoder)
        daoProvider.setUserDetailsService(userDetailsService)
        return ProviderManager(daoProvider)
    }
}
