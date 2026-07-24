package com.supertech.superbatch.audit.service;

import java.util.List;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.dto.BatchAuditResponse;

public interface BatchAuditService {
    void save(BatchAuditRequest request);

    List<BatchAuditResponse> getAll();

}
