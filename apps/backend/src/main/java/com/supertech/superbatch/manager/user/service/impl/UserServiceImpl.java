package com.supertech.superbatch.manager.user.service.impl;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.permission.service.PermissionService;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.role.repository.RoleRepository;
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
@Transactional
public class UserServiceImpl implements UserService {
        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final UserMapper userMapper;
        private final PasswordEncoder passwordEncoder;
        private final PermissionService permissionService;

        @Override
        public List<UserResponse> getAll() {
                List<User> users = userRepository.findAll();
                Map<Long, List<Permission>> permissionMap = users.stream()
                                .map(user -> user.getRole().getId())
                                .distinct()
                                .collect(Collectors.toMap(Function.identity(), permissionService::getByRoleId));

                return users.stream()
                                .map(user -> userMapper.toResponse(user, permissionMap.get(user.getRole().getId())))
                                .toList();
        }

        @Override
        public void create(UserRequest request, Long userId) {
                if (userRepository.existsByEmail(request.email())) {
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
        }

        @Override
        public void update(Long id, UpdateUserRequest request) {

                User user = userRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                if (userRepository.existsByEmailAndIdNot(request.email(), id)) {
                        throw new DuplicateResourceException("Email already exists.");
                }

                Role role = roleRepository.findById(request.roleId())
                                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));

                userMapper.updateEntity(user, request, role);

                userRepository.save(user);
        }

        @Override
        public void delete(Long id) {

                User user = userRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                userRepository.delete(user);
        }

        @Override
        public UserResponse getById(Long id) {
                User user = userRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                List<Permission> permissions = permissionService.getByRoleId(user.getRole().getId());
                return userMapper.toResponse(user, permissions);

        }
}