package com.supertech.superbatch.manager.permission.service;

import java.util.List;

import com.supertech.superbatch.manager.permission.dto.PermissionRequest;
import com.supertech.superbatch.manager.permission.entity.Permission;
import com.supertech.superbatch.manager.role.entity.Role;

public interface PermissionService {

    void savePermissions(Role role, List<PermissionRequest> requests);

    void deletePermissions(Long roleId);

    List<Permission> getByRoleId(Long roleId);

}
