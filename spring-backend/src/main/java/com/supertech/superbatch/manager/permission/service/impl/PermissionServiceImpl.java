package com.supertech.superbatch.manager.permission.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.AccessDeniedException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.entity.Module;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.module.repository.ModuleRepository;
import com.supertech.superbatch.manager.permission.dto.PermissionRequest;
import com.supertech.superbatch.manager.permission.dto.PermissionResponse;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.permission.mapper.PermissionMapper;
import com.supertech.superbatch.manager.permission.repository.PermissionRepository;
import com.supertech.superbatch.manager.permission.service.PermissionService;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.role.repository.RoleRepository;
import com.supertech.superbatch.manager.user.entity.Users;
import com.supertech.superbatch.manager.user.repository.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
        private final PermissionRepository permissionRepository;
        private final PermissionMapper permissionMapper;
        private final UsersRepository usersRepository;
        private final RoleRepository roleRepository;
        private final ModuleRepository moduleRepository;

        @Override
        public void checkReadPermission(Long userId, ModuleType module) {
                Users user = usersRepository.findById(userId)
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
                Users user = usersRepository.findById(userId)
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
        public List<PermissionResponse> getUserPermissions(Long userId) {
                Users user = usersRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                return permissionMapper.toResponseList(
                                permissionRepository.findByRoleId(
                                                user.getRole().getId()));
        }

        @Override
        @Transactional
        public List<PermissionResponse> getAll() {
                return permissionRepository.findAll()
                                .stream()
                                .map(permissionMapper::toResponse)
                                .toList();
        }

        @Override
        public void create(PermissionRequest request) {

                if (permissionRepository.existsByRoleIdAndModuleId(request.roleId(), request.moduleId())) {
                        throw new DuplicateResourceException("Permission already exists.");
                }

                Role role = roleRepository.findById(request.roleId())
                                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));

                Module module = moduleRepository.findById(request.moduleId())
                                .orElseThrow(() -> new ResourceNotFoundException("Module not found."));

                Permission permission = permissionMapper.toEntity(
                                role,
                                module,
                                request.canRead(),
                                request.canWrite());

                permissionRepository.save(permission);
        }

        @Override
        public void update(Long id, PermissionRequest request) {

                Permission permission = permissionRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Permission not found."));

                permissionMapper.updateEntity(
                                permission,
                                request.canRead(),
                                request.canWrite());

                permissionRepository.save(permission);
        }

        @Override
        public void delete(Long id) {

                Permission permission = permissionRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Permission not found."));

                permissionRepository.delete(permission);
        }

}