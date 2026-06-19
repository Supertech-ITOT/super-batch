package com.supertech.superbatch.manager.role.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.supertech.superbatch.manager.permission.dto.PermissionResponse;

import lombok.Builder;

@Builder
public record RoleResponse(
                Long id,
                String name,
                String description,
                List<PermissionResponse> permissions,
                LocalDateTime createdAt,
                LocalDateTime updatdeAt) {

}
