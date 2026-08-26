package com.supertech.superbatch.manager.license.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(LicenseServerProperties.class)

public class LicenseServerConfig {
    @Bean
    public RestClient licenseServerRestClient(LicenseServerProperties properties) {
        return RestClient.builder().baseUrl(properties.baseUrl()).build();
    }

}
