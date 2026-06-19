package com.supertech.superbatch.manager.permission.service;

import java.util.List;

import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.dto.PermissionRequest;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.role.entity.Role;

public interface PermissionService {

    void checkReadPermission(Long userId, ModuleType module);

    void checkWritePermission(Long userId, ModuleType module);

    void savePermissions(Role role, List<PermissionRequest> requests);

    void deletePermissions(Long roleId);

    List<Permission> getByRoleId(Long roleId);

}
