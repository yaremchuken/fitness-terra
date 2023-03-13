package yaremchuken.fitnessterra.config

import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.cache.RedisCacheConfiguration
import org.springframework.data.redis.cache.RedisCacheManager
import org.springframework.data.redis.connection.RedisConnectionFactory
import java.time.Clock
import java.time.Duration

@Configuration
@EnableCaching
class ApplicationConfig {

    @Bean
    fun clock(): Clock = Clock.systemUTC()

    @Bean
    fun cacheManager(connectionFactory: RedisConnectionFactory): RedisCacheManager =
        RedisCacheManager
            .builder(connectionFactory)
            .cacheDefaults(
                RedisCacheConfiguration.defaultCacheConfig()
                    .prefixCacheNameWith("${this.javaClass.packageName}.")
                    .entryTtl(Duration.ofHours(1))
                    .disableCachingNullValues())
            .build()
}
