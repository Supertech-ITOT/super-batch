package com.supertech.superbatch.audit.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record BatchAuditResponse(
                Long id,
                String action,
                String module,
                BatchAuditUserResponse performedBy,
                LocalDateTime performedAt,
                String oldData,
                String newData,
                String entity,
                Long entityId

) {

}
