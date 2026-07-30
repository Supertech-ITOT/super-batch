package com.supertech.superbatch.manager.role.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.permission.service.PermissionService;
import com.supertech.superbatch.manager.role.dto.RoleAudit;
import com.supertech.superbatch.manager.role.dto.RoleCreateRequest;
import com.supertech.superbatch.manager.role.dto.RoleRequest;
import com.supertech.superbatch.manager.role.dto.RoleResponse;
import com.supertech.superbatch.manager.role.dto.RoleUpdateRequest;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.role.mapper.RoleMapper;
import com.supertech.superbatch.manager.role.repository.RoleRepository;
import com.supertech.superbatch.manager.role.service.RoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    private final PermissionService permissionService;
    private final BatchAuditService batchAuditService;

    @Override
    public RoleResponse getById(Long id) {

        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));

        List<Permission> permissions = permissionService.getByRoleId(id);
        return roleMapper.toResponse(role, permissions);
    }

    @Override
    public List<RoleResponse> getAll() {

        List<RoleResponse> roles = roleRepository.findAll()
                .stream()
                .map(role -> roleMapper.toResponse(role, permissionService.getByRoleId(role.getId())))
                .toList();

        return roles;
    }

    @Override
    @Transactional
    public void create(RoleCreateRequest request) {
        if (roleRepository.existsByName(request.name())) {
            throw new DuplicateResourceException("Role already exists with name: " + request.name());
        }
        RoleRequest roleRequest = RoleRequest.builder()
                .name(request.name())
                .description(request.description())
                .build();
        Role role = roleMapper.toEntity(roleRequest);
        roleRepository.save(role);
        permissionService.savePermissions(role, request.permissions());

        BatchAuditRequest batchAuditRequest = BatchAuditRequest.builder()
                .entity("Role")
                .action(BatchAuditAction.CREATED)
                .module(ModuleType.MANAGER)
                .oldData(null)
                .newData(roleMapper.copy(role))
                .build();
        batchAuditService.save(batchAuditRequest);

    }

    @Transactional
    public void update(Long id, RoleUpdateRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        if (roleRepository.existsByNameAndIdNot(request.name(), id)) {
            throw new DuplicateResourceException("Role already exists with name: " + request.name());
        }

        RoleRequest roleRequest = RoleRequest.builder()
                .name(request.name())
                .description(request.description())
                .build();

        RoleAudit oldData = roleMapper.copy(role);

        roleMapper.updateEntity(role, roleRequest);
        permissionService.deletePermissions(id);
        permissionService.savePermissions(role, request.permissions());
        roleRepository.save(role);

        BatchAuditRequest batchAuditRequest = BatchAuditRequest.builder()
                .entity("Role")
                .action(BatchAuditAction.UPDATED)
                .module(ModuleType.MANAGER)
                .oldData(oldData)
                .newData(roleMapper.copy(role))
                .build();
        batchAuditService.save(batchAuditRequest);
    }

    @Override
    public void delete(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role not found."));
        BatchAuditRequest batchAuditRequest = BatchAuditRequest.builder()
                .entity("Role")
                .action(BatchAuditAction.DELETED)
                .module(ModuleType.MANAGER)
                .oldData(roleMapper.copy(role))
                .newData(null)
                .build();
        batchAuditService.save(batchAuditRequest);

        permissionService.deletePermissions(id);
        roleRepository.delete(role);
    }

}