package com.supertech.superbatch.audit.dto;

import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.manager.module.enums.ModuleType;

import lombok.Builder;

@Builder
public record BatchAuditRequest(
        String entity,
        BatchAuditAction action,
        ModuleType module,
        Object oldData,
        Object newData) {
}