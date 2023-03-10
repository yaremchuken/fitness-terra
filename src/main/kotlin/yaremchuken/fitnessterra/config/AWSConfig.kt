package yaremchuken.fitnessterra.config

import com.amazonaws.ClientConfiguration
import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.client.builder.AwsClientBuilder
import com.amazonaws.retry.RetryPolicy
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import org.apache.commons.lang3.StringUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AWSConfig(
    @Value("\${cloud.aws.credentials.access-key}") private val accessKey: String,
    @Value("\${cloud.aws.credentials.secret-key}") private val secretKey: String,
    @Value("\${cloud.aws.endpoint:}") private val endpoint: String,
    @Value("\${cloud.aws.region.static}") private val region: String
) {
    @Bean
    fun amazonS3(): AmazonS3 {
        val builder =
            AmazonS3ClientBuilder
                .standard()
                .withCredentials(AWSStaticCredentialsProvider(BasicAWSCredentials(accessKey, secretKey)))

        if (StringUtils.isNotBlank(endpoint))
            builder.withEndpointConfiguration(AwsClientBuilder.EndpointConfiguration(endpoint, region))
        else builder.withRegion(region)

        return builder.build()
    }
}
