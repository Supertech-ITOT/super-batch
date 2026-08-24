package com.supertech.superbatch.audit.service;

import org.springframework.data.domain.Page;
import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.dto.BatchAuditSearchRequest;

public interface BatchAuditService {
    void save(BatchAuditRequest request);

    Page<BatchAuditResponse> getAll(BatchAuditSearchRequest request);

    BatchAuditResponse getById(Long id);
}
