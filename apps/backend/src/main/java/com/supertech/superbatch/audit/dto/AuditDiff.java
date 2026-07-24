package com.supertech.superbatch.audit.dto;

public record AuditDiff(
        String oldData,
        String newData) {
}
