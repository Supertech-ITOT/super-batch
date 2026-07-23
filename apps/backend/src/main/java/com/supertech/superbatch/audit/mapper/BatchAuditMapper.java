package com.supertech.superbatch.audit.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.entity.BatchAudit;

@Component
public class BatchAuditMapper {
    public BatchAuditResponse toResponse(BatchAudit audit) {
        return BatchAuditResponse.builder()
                .id(audit.getId())
                .action(audit.getAction().name())
                .moduleName(audit.getModule().name())
                .performedBy(audit.getPerformedBy().getName())
                .performedAt(audit.getPerformedAt())
                .oldData(audit.getOldData())
                .newData(audit.getNewData())
                .build();

    }

}
