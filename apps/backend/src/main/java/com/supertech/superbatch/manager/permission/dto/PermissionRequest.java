package com.supertech.superbatch.manager.permission.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record PermissionRequest(

                @NotNull(message = "Module is required") Long moduleId,

                boolean access

) {
}