package com.supertech.superbatch.manager.setup.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.manager.setup.dto.SetupRequest;
import com.supertech.superbatch.manager.setup.dto.SetupResponse;
import com.supertech.superbatch.manager.setup.service.SetupService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/setup")
@RequiredArgsConstructor
public class SetupController {

        private final SetupService setupService;

        @GetMapping
        public ResponseEntity<ApiResponse<SetupResponse>> getSetupStatus() {
                return ResponseEntity.ok(ApiResponse.success("Setup status retrieved successfully",
                                setupService.getSetupStatus()));
        }

        @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<ApiResponse<Void>> setup(@ModelAttribute SetupRequest request) {
                setupService.setup(request);
                return ResponseEntity.ok(ApiResponse.success("System initialized successfully.", null));
        }
}