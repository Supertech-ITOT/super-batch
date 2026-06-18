package com.supertech.superbatch.manager.permission.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.module.entity.Module;
import com.supertech.superbatch.manager.permission.dto.PermissionResponse;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.role.entity.Role;

@Component
public class PermissionMapper {
    public PermissionResponse toResponse(Permission permission) {
        return PermissionResponse.builder()
                .module(permission.getModule().getName())
                .canRead(permission.isCanRead())
                .canWrite(permission.isCanWrite())
                .build();
    }

    public List<PermissionResponse> toResponseList(List<Permission> permissions) {
        return permissions.stream()
                .map(this::toResponse)
                .toList();
    }

    public Permission toEntity(Role role, Module module, boolean canRead, boolean canWrite) {
        return Permission.builder()
                .role(role)
                .module(module)
                .canRead(canRead)
                .canWrite(canWrite)
                .build();
    }

    public void updateEntity(Permission permission, boolean canRead, boolean canWrite) {
        permission.setCanRead(canRead);
        permission.setCanWrite(canWrite);
    }

}
