package com.supertech.superbatch.audit.service;

import java.util.List;

import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.entity.BatchAudit;

public interface BatchAuditService {
    void save(BatchAudit batchAudit);

    List<BatchAuditResponse> getAll();

}
