package com.supertech.superbatch.report.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.report.service.ReportConfigurationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports/configuration")
@RequiredArgsConstructor
public class ReportConfigurationController {
    private final ReportConfigurationService reportConfigurationService;

    @GetMapping("/logo")
    public ResponseEntity<ApiResponse<String>> getCompanyLogo() {
        return ResponseEntity.ok(
                ApiResponse.success("Company logo fetched successfully", reportConfigurationService.getCompanyLogo()));
    }

    @PutMapping("/logo")
    public ResponseEntity<ApiResponse<Void>> uploadCompanyLogo(@RequestParam("file") MultipartFile file) {
        reportConfigurationService.uploadCompanyLogo(file);
        return ResponseEntity.ok(ApiResponse.success("Company logo uploaded successfully.", null));
    }

    @DeleteMapping("/logo")
    public ResponseEntity<ApiResponse<Void>> deleteCompanyLogo() {
        reportConfigurationService.deleteCompanyLogo();
        return ResponseEntity.ok(ApiResponse.success("Company logo deleted successfully.", null));
    }
}
