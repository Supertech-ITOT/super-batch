package com.supertech.superbatch.manager.role.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.role.dto.RoleRequest;
import com.supertech.superbatch.manager.role.dto.RoleResponse;
import com.supertech.superbatch.manager.role.entity.Role;

@Component
public class RoleMapper {

    public RoleResponse toResponse(Role role) {
        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .createdAt(role.getCreatedAt())
                .updatdeAt(role.getUpdatedAt())
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
