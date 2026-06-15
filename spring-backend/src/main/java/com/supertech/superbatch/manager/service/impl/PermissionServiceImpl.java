package com.supertech.superbatch.manager.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.AccessDeniedException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.dto.PermissionResponse;
import com.supertech.superbatch.manager.entity.Permission;
import com.supertech.superbatch.manager.entity.Users;
import com.supertech.superbatch.manager.enums.ModuleType;
import com.supertech.superbatch.manager.mapper.PermissionMapper;
import com.supertech.superbatch.manager.repository.PermissionRepository;
import com.supertech.superbatch.manager.repository.UsersRepository;
import com.supertech.superbatch.manager.service.PermissionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
    private final PermissionRepository permissionRepository;
    private final PermissionMapper permissionMapper;
    private final UsersRepository usersRepository;

    @Override
    public void checkReadPermission(Long userId, ModuleType module) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Permission permission = permissionRepository.findByRoleIdAndModuleId(user.getRole().getId(), module.getId())
                .orElseThrow(() -> new AccessDeniedException(
                        "Permission not found"));

        if (!permission.isCanRead()) {
            throw new AccessDeniedException("Read access denied");
        }
    }

    @Override
    public void checkWritePermission(Long userId, ModuleType module) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Permission permission = permissionRepository.findByRoleIdAndModuleId(user.getRole().getId(), module.getId())
                .orElseThrow(() -> new AccessDeniedException(
                        "Permission not found"));

        if (!permission.isCanWrite()) {
            throw new AccessDeniedException("Write access denied");
        }
    }

    @Override
    public List<PermissionResponse> getUserPermissions(Long userId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return permissionMapper.toResponseList(
                permissionRepository.findByRoleId(
                        user.getRole().getId()));
    }

}