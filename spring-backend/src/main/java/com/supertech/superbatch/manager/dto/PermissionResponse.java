package com.supertech.superbatch.manager.dto;

import com.supertech.superbatch.manager.enums.ModuleType;

import lombok.Builder;

@Builder
public record PermissionResponse(
        ModuleType module,
        boolean canRead,
        boolean canWrite) {
}
