package com.supertech.superbatch.manager.role.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.permission.mapper.PermissionMapper;
import com.supertech.superbatch.manager.role.dto.RoleRequest;
import com.supertech.superbatch.manager.role.dto.RoleResponse;
import com.supertech.superbatch.manager.role.entity.Role;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RoleMapper {
    private final PermissionMapper permissionMapper;

    public RoleResponse toResponse(Role role, List<Permission> permissions) {
        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .permissions(permissionMapper.toResponseList(permissions))
                .createdAt(role.getCreatedAt())
                .updatedAt(role.getUpdatedAt())
                .build();
    }

    public Role toEntity(RoleRequest request) {
        return Role.builder()
                .name(request.name())
                .description(request.description())
                .build();
    }

    public void updateEntity(Role role, RoleRequest request) {
        role.setName(request.name());
        role.setDescription(request.description());
    }

}
