package com.supertech.superbatch.manager.permission.service;

import com.supertech.superbatch.manager.module.enums.ModuleType;

public interface PermissionService {
    boolean hasAccess(Long userId, ModuleType module);
}