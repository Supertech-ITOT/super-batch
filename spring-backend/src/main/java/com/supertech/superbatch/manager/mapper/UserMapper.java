package com.supertech.superbatch.manager.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.dto.User.UserRequest;
import com.supertech.superbatch.manager.dto.User.UserResponse;
import com.supertech.superbatch.manager.entity.Role;
import com.supertech.superbatch.manager.entity.Users;

@Component
public class UserMapper {

    public UserResponse toResponse(Users user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .enabled(user.isEnabled())
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
                .enabled(request.enabled() == null ? true : request.enabled())
                .role(role)
                .createdBy(createdBy)
                .build();
    }

    public void updateEntity(Users user, UserRequest request, Role role) {
        user.setName(request.name());
        user.setEmail(request.email());
        user.setRole(role);
        if (request.enabled() != null) {
            user.setEnabled(request.enabled());
        }
    }
}