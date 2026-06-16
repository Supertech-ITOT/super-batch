package com.supertech.superbatch.manager.service;

import java.util.List;

import com.supertech.superbatch.manager.dto.Permission.PermissionRequest;
import com.supertech.superbatch.manager.dto.Permission.PermissionResponse;
import com.supertech.superbatch.manager.enums.ModuleType;

public interface PermissionService {

    void checkReadPermission(Long userId, ModuleType module);

    void checkWritePermission(Long userId, ModuleType module);

    List<PermissionResponse> getUserPermissions(Long userId);

    List<PermissionResponse> getAll();

    void create(PermissionRequest request);

    void update(Long id, PermissionRequest request);

    void delete(Long id);

}
