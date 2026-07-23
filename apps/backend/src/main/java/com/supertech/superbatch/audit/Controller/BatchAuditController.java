package com.supertech.superbatch.audit.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/batch-audits")
@RequiredArgsConstructor

public class BatchAuditController {
    private final BatchAuditService batchAuditService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BatchAuditResponse>>> getAll() {

        List<BatchAuditResponse> res = batchAuditService.getAll();
        return ResponseEntity.ok(
                ApiResponse.success("Audit fetched successfully", res));
    }

}
