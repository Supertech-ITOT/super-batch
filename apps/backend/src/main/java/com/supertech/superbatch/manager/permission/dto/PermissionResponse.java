package com.supertech.superbatch.manager.permission.dto;

import lombok.Builder;

@Builder
public record PermissionResponse(
                Long moduleId,
                String moduleName,
                boolean canRead,
                boolean canWrite) {
}
