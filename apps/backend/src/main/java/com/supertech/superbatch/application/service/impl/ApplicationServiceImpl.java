package com.supertech.superbatch.application.service.impl;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.boot.info.BuildProperties;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.application.dto.ApplicationInfoResponse;
import com.supertech.superbatch.application.service.ApplicationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")
            .withZone(ZoneId.systemDefault());
    private final BuildProperties buildProperties;

    @Override
    public ApplicationInfoResponse getApplicationInfo() {

        Instant buildTime = buildProperties.getTime();

        return ApplicationInfoResponse.builder()
                .name(buildProperties.getName())
                .version(buildProperties.getVersion())
                .buildTime(buildTime != null ? DATE_FORMATTER.format(buildTime) : null)
                .build();
    }
}