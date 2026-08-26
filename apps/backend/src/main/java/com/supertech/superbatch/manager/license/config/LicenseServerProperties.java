package com.supertech.superbatch.manager.license.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "license.server")
public record LicenseServerProperties(String baseUrl) {

}
