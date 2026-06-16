package com.supertech.superbatch.manager.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.dto.Role.RoleRequest;
import com.supertech.superbatch.manager.dto.Role.RoleResponse;
import com.supertech.superbatch.manager.entity.Role;
import com.supertech.superbatch.manager.mapper.RoleMapper;
import com.supertech.superbatch.manager.repository.RoleRepository;
import com.supertech.superbatch.manager.service.RoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    @Transactional(readOnly = true)
    public List<RoleResponse> getAll() {
        return roleRepository.findAll()
                .stream()
                .map(roleMapper::toResponse)
                .toList();
    }

    @Override
    public void create(RoleRequest request) {

        if (roleRepository.existsByName(request.name())) {
            throw new DuplicateResourceException("Role already exists with name: " + request.name());
        }
        Role role = roleMapper.toEntity(request);
        roleRepository.save(role);
    }

    @Override
    public void update(Long id, RoleRequest request) {

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));

        if (roleRepository.existsByNameAndIdNot(request.name(), id)) {
            throw new DuplicateResourceException(
                    "Role already exists with name: " + request.name());
        }

        roleMapper.updateEntity(role, request);
        roleRepository.save(role);
    }

    @Override
    public void delete(Long id) {

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Role not found."));
        roleRepository.delete(role);
    }
}