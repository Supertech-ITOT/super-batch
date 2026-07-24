package com.supertech.superbatch.audit.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.dto.BatchAuditUserResponse;
import com.supertech.superbatch.audit.entity.BatchAudit;
import com.supertech.superbatch.manager.user.entity.User;

@Component
public class BatchAuditMapper {
    public BatchAuditResponse toResponse(BatchAudit audit) {
        return BatchAuditResponse.builder()
                .id(audit.getId())
                .action(audit.getAction().name())
                .moduleName(audit.getModule().name())
                .performedBy(toResponse(audit.getPerformedBy()))
                .performedAt(audit.getPerformedAt())
                .oldData(audit.getOldData())
                .newData(audit.getNewData())
                .entityName(audit.getEntityName())
                .entityId(audit.getEntityId())
                .build();

    }

    private BatchAuditUserResponse toResponse(User user) {
        return BatchAuditUserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .build();
    }

    public BatchAudit toEntity(BatchAuditRequest request, User performedBy) {
        return BatchAudit.builder()
                .entityId(request.entityId())
                .entityName(request.entityName())
                .action(request.action())
                .module(request.module())
                .performedBy(performedBy)
                .build();
    }

}
