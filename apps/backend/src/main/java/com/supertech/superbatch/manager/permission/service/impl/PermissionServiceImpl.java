package com.supertech.superbatch.manager.permission.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.service.PermissionService;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PermissionServiceImpl implements PermissionService {
    private final UserRepository userRepository;

    @Override
    public boolean hasAccess(Long userId, ModuleType module) {
        User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        return user.getRole()
                .getPermissions()
                .stream()
                .anyMatch(permission -> permission.getModule().getId().equals(module.getId()) && permission.isAccess());
    }
}