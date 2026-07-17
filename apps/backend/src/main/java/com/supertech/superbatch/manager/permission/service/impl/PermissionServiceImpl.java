package com.supertech.superbatch.manager.permission.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.AccessDeniedException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.module.repository.ModuleRepository;
import com.supertech.superbatch.manager.module.entity.Module;
import com.supertech.superbatch.manager.permission.dto.PermissionRequest;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.permission.mapper.PermissionMapper;
import com.supertech.superbatch.manager.permission.repository.PermissionRepository;
import com.supertech.superbatch.manager.permission.service.PermissionService;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
        private final PermissionRepository permissionRepository;
        private final PermissionMapper permissionMapper;
        private final UserRepository userRepository;
        private final ModuleRepository moduleRepository;

        @Override
        public void checkReadPermission(Long userId, ModuleType module) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                Permission permission = permissionRepository
                                .findByRoleIdAndModuleId(user.getRole().getId(), module.getId())
                                .orElseThrow(() -> new AccessDeniedException("Permission not found"));

                if (!permission.isCanRead()) {
                        throw new AccessDeniedException("Read access denied");
                }
        }

        @Override
        public void checkWritePermission(Long userId, ModuleType module) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                Permission permission = permissionRepository
                                .findByRoleIdAndModuleId(user.getRole().getId(), module.getId())
                                .orElseThrow(() -> new AccessDeniedException(
                                                "Permission not found"));

                if (!permission.isCanWrite()) {
                        throw new AccessDeniedException("Write access denied");
                }
        }

        @Override
        public void savePermissions(Role role, List<PermissionRequest> requests) {
                List<Permission> permissions = requests.stream().map(req -> {
                        Module module = moduleRepository.findById(req.moduleId())
                                        .orElseThrow(() -> new ResourceNotFoundException("Module not found"));
                        return permissionMapper.toEntity(role, module, req.canRead(), req.canWrite());
                }).toList();
                permissionRepository.saveAll(permissions);
        }

        @Override
        public void deletePermissions(Long roleId) {
                permissionRepository.deleteByRoleId(roleId);
                permissionRepository.flush();
        }

        @Override
        public List<Permission> getByRoleId(Long roleId) {
                return permissionRepository.findByRoleId(roleId);
        }

}