package com.supertech.superbatch.manager.role.dto;

import java.util.List;

import com.supertech.superbatch.manager.permission.dto.PermissionRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record RoleUpdateRequest(

                @Pattern(regexp = "^[A-Za-z]+(?: [A-Za-z]+)*$", message = "Role name can contain only letters and single spaces between words") String name,

                @NotBlank(message = "Description is required") @Size(max = 255, message = "Description must be a single line and not exceed 255 characters") @Pattern(regexp = "^[^\\r\\n]*$", message = "Description must be a single line") String description,

                List<PermissionRequest> permissions

) {
}
