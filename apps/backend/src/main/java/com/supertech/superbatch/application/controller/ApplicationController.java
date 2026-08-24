package com.supertech.superbatch.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.application.dto.ApplicationInfoResponse;
import com.supertech.superbatch.application.service.ApplicationService;
import com.supertech.superbatch.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/application")
@CrossOrigin("*")
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/info")
    public ResponseEntity<ApiResponse<ApplicationInfoResponse>> getApplicationInfo() {
        ApplicationInfoResponse res = applicationService.getApplicationInfo();
        return ResponseEntity.ok(ApiResponse.success("Application info fetched successfully", res));
    }
}