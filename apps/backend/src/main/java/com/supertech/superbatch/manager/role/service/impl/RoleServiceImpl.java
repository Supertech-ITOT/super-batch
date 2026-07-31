package com.supertech.superbatch.manager.role.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.module.repository.ModuleRepository;
import com.supertech.superbatch.manager.permission.dto.PermissionRequest;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.role.dto.RoleAudit;
import com.supertech.superbatch.manager.role.dto.RoleCreateRequest;
import com.supertech.superbatch.manager.role.dto.RoleRequest;
import com.supertech.superbatch.manager.role.dto.RoleResponse;
import com.supertech.superbatch.manager.role.dto.RoleUpdateRequest;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.role.mapper.RoleMapper;
import com.supertech.superbatch.manager.role.repository.RoleRepository;
import com.supertech.superbatch.manager.role.service.RoleService;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import com.supertech.superbatch.manager.module.entity.Module;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    private final BatchAuditService batchAuditService;
    private final ModuleRepository moduleRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public RoleResponse getById(Long id) {
        Role role = roleRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));
        List<Permission> permissions = role.getPermissions().stream().toList();
        return roleMapper.toResponse(role, permissions);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoleResponse> getAll() {
        List<RoleResponse> roles = roleRepository.findBySystemRoleFalseAndDeletedFalse()
                .stream()
                .map(role -> roleMapper.toResponse(role, role.getPermissions().stream().toList()))
                .toList();

        return roles;
    }

    @Override
    public void create(RoleCreateRequest request) {
        if (roleRepository.existsByNameAndDeletedFalse(request.name())) {
            throw new DuplicateResourceException("Role already exists with name: " + request.name());
        }
        RoleRequest roleRequest = RoleRequest.builder()
                .name(request.name())
                .description(request.description())
                .build();
        Role role = roleMapper.toEntity(roleRequest);
        savePermissions(role, request.permissions());
        roleRepository.save(role);
        audit(BatchAuditAction.CREATED, null, roleMapper.copy(role));
    }

    @Override
    public void update(Long id, RoleUpdateRequest request) {
        Role role = roleRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        if (roleRepository.existsByNameAndIdNotAndDeletedFalse(request.name(), id)) {
            throw new DuplicateResourceException("Role already exists with name: " + request.name());
        }
        if (role.isSystemRole()) {
            throw new BadRequestException("System role is not editable.");
        }
        RoleRequest roleRequest = RoleRequest.builder()
                .name(request.name())
                .description(request.description())
                .build();
        RoleAudit oldData = roleMapper.copy(role);
        role.clearPermissions();
        roleRepository.flush();
        roleMapper.updateEntity(role, roleRequest);
        savePermissions(role, request.permissions());
        roleRepository.save(role);
        audit(BatchAuditAction.UPDATED, oldData, roleMapper.copy(role));
    }

    @Override
    public void delete(Long id, Long currentUserId) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role not found."));
        if (role.isSystemRole()) {
            throw new BadRequestException("System role cannot be deleted.");
        }
        long userCount = userRepository.countByRoleIdAndDeletedFalse(id);

        if (userCount > 0) {
            throw new BadRequestException(
                    "This role is assigned to " + userCount +
                            " user(s). Please assign them to another role before deleting this role.");
        }

        User deletedBy = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));

        audit(BatchAuditAction.DELETED, roleMapper.copy(role), null);
        role.setDeleted(true);
        role.setDeletedAt(LocalDateTime.now());
        role.setDeletedBy(deletedBy);
        roleRepository.save(role);
    }

    private void audit(BatchAuditAction action, RoleAudit oldData, RoleAudit newData) {
        batchAuditService.save(
                BatchAuditRequest.builder()
                        .entity(EntityType.ROLE)
                        .module(ModuleType.MANAGER)
                        .action(action)
                        .oldData(oldData)
                        .newData(newData)
                        .build());
    }

    private void savePermissions(Role role, List<PermissionRequest> requests) {
        List<Long> moduleIds = requests.stream()
                .map(PermissionRequest::moduleId)
                .distinct()
                .toList();

        Map<Long, Module> moduleMap = moduleRepository.findAllById(moduleIds)
                .stream()
                .collect(Collectors.toMap(Module::getId, Function.identity()));

        for (PermissionRequest request : requests) {
            Module module = moduleMap.get(request.moduleId());
            if (module == null) {
                throw new ResourceNotFoundException("Module not found: " + request.moduleId());
            }
            role.addPermission(Permission.builder().module(module).access(request.access()).build());
        }
    }

}