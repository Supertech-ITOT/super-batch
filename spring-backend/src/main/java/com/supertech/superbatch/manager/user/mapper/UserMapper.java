package com.supertech.superbatch.manager.user.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.user.dto.UpdateUserRequest;
import com.supertech.superbatch.manager.user.dto.UserRequest;
import com.supertech.superbatch.manager.user.dto.UserResponse;
import com.supertech.superbatch.manager.user.entity.Users;

@Component
public class UserMapper {

    public UserResponse toResponse(Users user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roleId(user.getRole().getId())
                .roleName(user.getRole().getName())
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

    public Users toEntity(UserRequest request, Role role, Users createdBy, String encodedPassword) {
        return Users.builder()
                .name(request.name())
                .email(request.email())
                .password(encodedPassword)
                .role(role)
                .createdBy(createdBy)
                .build();
    }

    public void updateEntity(Users user, UpdateUserRequest request, Role role) {
        user.setName(request.name());
        user.setEmail(request.email());
        user.setRole(role);
    }
}