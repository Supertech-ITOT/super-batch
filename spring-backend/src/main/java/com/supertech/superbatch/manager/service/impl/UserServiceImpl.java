package com.supertech.superbatch.manager.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.dto.User.UserRequest;
import com.supertech.superbatch.manager.dto.User.UserResponse;
import com.supertech.superbatch.manager.entity.Role;
import com.supertech.superbatch.manager.entity.Users;
import com.supertech.superbatch.manager.mapper.UserMapper;
import com.supertech.superbatch.manager.repository.RoleRepository;
import com.supertech.superbatch.manager.repository.UsersRepository;
import com.supertech.superbatch.manager.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UsersRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional()
    public List<UserResponse> getAll() {
        return userRepository.findAllWithRoleAndCreatedBy()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    public void create(UserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        Role role = roleRepository.findById(request.roleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));

        Users user = userMapper.toEntity(
                request,
                role,
                null,
                passwordEncoder.encode(request.password()));

        userRepository.save(user);
    }

    @Override
    public void update(Long id, UserRequest request) {

        Users user = userRepository.findById(id)
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

        Users user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        userRepository.delete(user);
    }
}