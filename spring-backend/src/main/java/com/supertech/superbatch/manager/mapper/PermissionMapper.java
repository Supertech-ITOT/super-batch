package com.supertech.superbatch.manager.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.dto.PermissionResponse;
import com.supertech.superbatch.manager.entity.Permission;

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

}
