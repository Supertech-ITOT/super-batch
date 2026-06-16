package com.supertech.superbatch.manager.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.dto.Role.RoleRequest;
import com.supertech.superbatch.manager.dto.Role.RoleResponse;
import com.supertech.superbatch.manager.entity.Role;

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
