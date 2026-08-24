package com.supertech.superbatch.audit.mapper;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.dto.BatchAuditUserResponse;
import com.supertech.superbatch.audit.entity.BatchAudit;
import com.supertech.superbatch.manager.module.entity.Module;
import com.supertech.superbatch.manager.user.entity.User;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BatchAuditMapper {
    private final ObjectMapper objectMapper;

    public BatchAuditResponse toResponse(BatchAudit audit) {
        return BatchAuditResponse.builder()
                .id(audit.getId())
                .action(audit.getAction().name())
                .module(audit.getModule().getName())
                .performedBy(toResponse(audit.getPerformedBy()))
                .performedAt(audit.getPerformedAt())
                .oldData(audit.getOldData())
                .newData(audit.getNewData())
                .entity(audit.getEntity().name())
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

    public BatchAudit toEntity(BatchAuditRequest request, User performedBy, Module module) {
        return BatchAudit.builder()
                .entity(request.entity())
                .action(request.action())
                .module(module)
                .performedBy(performedBy)
                .oldData(toJson(request.oldData()))
                .newData(toJson(request.newData()))
                .build();
    }

    private String toJson(Object data) {
        if (data == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Failed to serialize audit data", e);
        }
    }

}
