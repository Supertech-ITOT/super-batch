package com.supertech.superbatch.audit.dto;

import java.time.LocalDate;

import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.manager.module.enums.ModuleType;

import lombok.Builder;

@Builder
public record BatchAuditSearchRequest(
                String search,
                ModuleType module,
                BatchAuditAction action,
                Long userId,
                LocalDate fromDate,
                LocalDate toDate,
                Integer page,
                Integer size

) {

}
