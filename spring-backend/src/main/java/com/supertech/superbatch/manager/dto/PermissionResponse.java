package com.supertech.superbatch.manager.dto;

import lombok.Builder;

@Builder
public record PermissionResponse(
                String module,
                boolean canRead,
                boolean canWrite) {
}
