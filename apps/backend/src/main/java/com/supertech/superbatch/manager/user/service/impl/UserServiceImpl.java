package com.supertech.superbatch.manager.user.service.impl;

import com.supertech.superbatch.manager.user.dto.UserAudit;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.common.exception.UnauthorizedException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.manager.license.entity.License;
import com.supertech.superbatch.manager.license.enums.LicenseStatus;
import com.supertech.superbatch.manager.license.repository.LicenseRepository;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.manager.role.entity.DefaultRole;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.role.repository.RoleRepository;
import com.supertech.superbatch.manager.user.dto.ChangePasswordRequest;
import com.supertech.superbatch.manager.user.dto.ResetFirstPasswordRequest;
import com.supertech.superbatch.manager.user.dto.ResetPasswordRequest;
import com.supertech.superbatch.manager.user.dto.UpdateUserRequest;
import com.supertech.superbatch.manager.user.dto.UserRequest;
import com.supertech.superbatch.manager.user.dto.UserResponse;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.mapper.UserMapper;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.manager.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)

public class UserServiceImpl implements UserService {
        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final UserMapper userMapper;
        private final PasswordEncoder passwordEncoder;
        private final BatchAuditService batchAuditService;
        private final LicenseRepository licenseRepository;

        @Override
        @RequiresLicense()
        @RequiresPermission(ModuleType.MANAGER)
        public List<UserResponse> getAll() {
                return userRepository.findByDeletedFalseAndSystemAccountFalse()
                                .stream()
                                .map(user -> userMapper.toResponse(user, List.copyOf(user.getRole().getPermissions())))
                                .toList();
        }

        @Override
        @Transactional
        @RequiresLicense()
        @RequiresPermission(ModuleType.MANAGER)
        public void create(UserRequest request, Long userId) {
                License license = licenseRepository.findByStatus(LicenseStatus.ACTIVE)
                                .orElseThrow(() -> new ResourceNotFoundException("License not found."));

                long userCount = userRepository.countByDeletedFalseAndSystemAccountFalse();
                if (userCount >= license.getPlanMaxUser()) {
                        throw new BadRequestException("User limit is reached for the current plan.");
                }
                String email = request.email().trim().toLowerCase();
                if (userRepository.existsByEmailAndDeletedFalse(email)) {
                        throw new DuplicateResourceException("Email already exists.");
                }
                Role role = roleRepository.findById(request.roleId())
                                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
                User createdBy = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                User user = userMapper.toEntity(
                                request,
                                role,
                                createdBy,
                                passwordEncoder.encode(request.password()));
                userRepository.save(user);
                license.setUserCount(license.getUserCount() + 1);
                licenseRepository.save(license);
                audit(BatchAuditAction.CREATED, null, userMapper.copy(user));

        }

        @Override
        @Transactional
        @RequiresLicense()
        @RequiresPermission(ModuleType.MANAGER)
        public void update(Long id, UpdateUserRequest request) {
                String email = request.email().trim().toLowerCase();
                User user = userRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                if (user.isSystemAccount()) {
                        throw new BadRequestException("System user cannot be modified.");
                }
                if (userRepository.existsByEmailAndIdNotAndDeletedFalse(email, id)) {
                        throw new DuplicateResourceException("Email already exists.");
                }
                Role role = roleRepository.findById(request.roleId())
                                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
                UserAudit oldData = userMapper.copy(user);

                boolean removingLastAdministrator = DefaultRole.ADMINISTRATOR.equals(user.getRole().getName())
                                && !DefaultRole.ADMINISTRATOR.equals(role.getName());

                if (removingLastAdministrator) {
                        long adminCount = userRepository.countByRoleNameAndDeletedFalse(DefaultRole.ADMINISTRATOR);
                        if (adminCount <= 1) {
                                throw new BadRequestException("At least one administrator must remain.");
                        }
                }

                userMapper.updateEntity(user, request, role);
                userRepository.save(user);
                audit(BatchAuditAction.UPDATED, oldData, userMapper.copy(user));

        }

        @Override
        @Transactional
        @RequiresLicense()
        @RequiresPermission(ModuleType.MANAGER)
        public void delete(Long id, Long currentUserId) {
                User user = userRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                if (user.isSystemAccount()) {
                        throw new BadRequestException("System user cannot be deleted.");
                }

                if ("Administrator".equals(user.getRole().getName())) {
                        long adminCount = userRepository.countByRoleNameAndDeletedFalse("Administrator");
                        if (adminCount <= 1) {
                                throw new BadRequestException("The last administrator cannot be deleted.");
                        }
                }
                User deletedBy = userRepository.findById(currentUserId)
                                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));
                audit(BatchAuditAction.DELETED, userMapper.copy(user), null);
                user.setDeleted(true);
                user.setDeletedAt(LocalDateTime.now());
                user.setDeletedBy(deletedBy);
                userRepository.save(user);

                License license = licenseRepository.findByStatus(LicenseStatus.ACTIVE)
                                .orElseThrow(() -> new ResourceNotFoundException("License not found."));

                license.setUserCount(license.getUserCount() - 1);
                licenseRepository.save(license);
        }

        @Override
        @RequiresLicense()
        public UserResponse getById(Long id) {
                User user = userRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                return userMapper.toResponse(user, List.copyOf(user.getRole().getPermissions()));
        }

        private void audit(BatchAuditAction action, UserAudit oldData, UserAudit newData) {
                batchAuditService.save(
                                BatchAuditRequest.builder()
                                                .entity(EntityType.USER)
                                                .module(ModuleType.MANAGER)
                                                .action(action)
                                                .oldData(oldData)
                                                .newData(newData)
                                                .build());
        }

        @Override
        @Transactional
        @RequiresLicense()
        public void resetFirstPassword(ResetFirstPasswordRequest request, Long currentUserId) {

                User user = userRepository.findByIdAndDeletedFalse(currentUserId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                if (user.isSystemAccount()) {
                        throw new BadRequestException("System user password cannot be reset.");
                }
                if (!user.isPasswordChangeRequired()) {
                        throw new BadRequestException("Password reset is not required.");
                }
                if (passwordEncoder.matches(request.password(), user.getPassword())) {
                        throw new BadRequestException(
                                        "New password must be different from the current password.");
                }
                user.setPassword(passwordEncoder.encode(request.password()));
                user.setPasswordChangeRequired(false);

                userRepository.save(user);
        }

        @Override
        @Transactional
        @RequiresLicense()
        public void changePassword(ChangePasswordRequest request, Long id) {
                User user = userRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
                        throw new BadRequestException("Current password is incorrect.");
                }

                if (passwordEncoder.matches(request.newPassword(), user.getPassword())) {
                        throw new BadRequestException("New password must be different from the current password.");
                }

                user.setPassword(passwordEncoder.encode(request.newPassword()));
                userRepository.save(user);
        }

        @Override
        @Transactional
        @RequiresLicense()
        public void resetPassword(ResetPasswordRequest request, Long id) {
                User user = userRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                if (user.isSystemAccount()) {
                        throw new BadRequestException("System user password cannot be reset.");
                }
                user.setPassword(passwordEncoder.encode(request.password()));
                user.setPasswordChangeRequired(true);
                userRepository.save(user);
        }

        @Override
        public UserResponse getCurrentUser(Long currentUserId) {
                User user = userRepository.findByIdAndDeletedFalse(currentUserId)
                                .orElseThrow(() -> new UnauthorizedException("TOKEN_EXPIRED"));
                return userMapper.toResponse(user, List.copyOf(user.getRole().getPermissions()));
        }

}