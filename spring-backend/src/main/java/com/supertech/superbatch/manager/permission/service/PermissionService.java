package com.supertech.superbatch.manager.permission.service;

import java.util.List;

import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.dto.PermissionRequest;
import com.supertech.superbatch.manager.permission.dto.PermissionResponse;

public interface PermissionService {

    void checkReadPermission(Long userId, ModuleType module);

    void checkWritePermission(Long userId, ModuleType module);

    List<PermissionResponse> getUserPermissions(Long userId);

    List<PermissionResponse> getAll();

    void create(PermissionRequest request);

    void update(Long id, PermissionRequest request);

    void delete(Long id);

}
