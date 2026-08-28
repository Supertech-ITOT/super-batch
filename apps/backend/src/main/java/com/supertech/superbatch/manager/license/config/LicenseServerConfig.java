package com.supertech.superbatch.manager.license.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class LicenseServerConfig {

    @Value("${license.server.base-url}")
    private String baseUrl;

    @Bean
    public RestClient licenseServerRestClient() {
        return RestClient.builder()
                .baseUrl(baseUrl)
                .build();
    }
}