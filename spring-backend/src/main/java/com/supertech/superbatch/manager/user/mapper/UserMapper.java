package com.supertech.superbatch.manager.user.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.permission.mapper.PermissionMapper;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.user.dto.UpdateUserRequest;
import com.supertech.superbatch.manager.user.dto.UserRequest;
import com.supertech.superbatch.manager.user.dto.UserResponse;
import com.supertech.superbatch.manager.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final PermissionMapper permissionMapper;

    public UserResponse toResponse(User user, List<Permission> permissions) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roleId(user.getRole().getId())
                .roleName(user.getRole().getName())
                .permissions(permissionMapper.toResponseList(permissions))
                .createdById(
                        user.getCreatedBy() != null
                                ? user.getCreatedBy().getId()
                                : null)
                .createdByName(
                        user.getCreatedBy() != null
                                ? user.getCreatedBy().getName()
                                : null)
                .lastLoginAt(user.getLastLoginAt())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public User toEntity(UserRequest request, Role role, User createdBy, String encodedPassword) {
        return User.builder()
                .name(request.name())
                .email(request.email())
                .password(encodedPassword)
                .role(role)
                .createdBy(createdBy)
                .build();
    }

    public void updateEntity(User user, UpdateUserRequest request, Role role) {
        user.setName(request.name());
        user.setEmail(request.email());
        user.setRole(role);
    }
}