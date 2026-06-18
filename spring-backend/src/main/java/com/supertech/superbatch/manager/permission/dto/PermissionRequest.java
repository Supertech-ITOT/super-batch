package com.supertech.superbatch.manager.permission.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record PermissionRequest(

                @NotNull(message = "Role is required") Long roleId,

                @NotNull(message = "Module is required") Long moduleId,

                boolean canRead,

                boolean canWrite

) {
}