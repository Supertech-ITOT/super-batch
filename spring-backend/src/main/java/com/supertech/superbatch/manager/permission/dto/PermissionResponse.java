package com.supertech.superbatch.manager.permission.dto;

import lombok.Builder;

@Builder
public record PermissionResponse(
        String module,
        boolean canRead,
        boolean canWrite) {
}
