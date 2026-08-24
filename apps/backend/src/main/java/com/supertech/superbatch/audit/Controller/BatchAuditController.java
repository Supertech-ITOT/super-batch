package com.supertech.superbatch.audit.Controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.dto.BatchAuditSearchRequest;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/batch-audits")
@RequiredArgsConstructor

public class BatchAuditController {
    private final BatchAuditService batchAuditService;

    @PostMapping
    public ResponseEntity<ApiResponse<Page<BatchAuditResponse>>> getAll(
            @RequestBody BatchAuditSearchRequest request) {
        Page<BatchAuditResponse> res = batchAuditService.getAll(request);
        return ResponseEntity.ok(ApiResponse.success("Audits fetched successfully", res));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BatchAuditResponse>> getById(@PathVariable Long id) {
        BatchAuditResponse res = batchAuditService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Audit fetched successfully", res));
    }

}
