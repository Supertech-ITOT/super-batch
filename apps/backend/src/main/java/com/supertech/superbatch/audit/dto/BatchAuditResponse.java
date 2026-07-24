package com.supertech.superbatch.audit.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record BatchAuditResponse(
        Long id,
        String action,
        String moduleName,
        BatchAuditUserResponse performedBy,
        LocalDateTime performedAt,
        String oldData,
        String newData,
        String entityName,
        Long entityId

) {

}
