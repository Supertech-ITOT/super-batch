package com.supertech.superbatch.manager.role.service;

import java.util.List;

import com.supertech.superbatch.manager.role.dto.RoleRequest;
import com.supertech.superbatch.manager.role.dto.RoleResponse;

public interface RoleService {
    List<RoleResponse> getAll();

    RoleResponse getById(Long id);

    void create(RoleRequest request);

    void update(Long id, RoleRequest request);

    void delete(Long id);
}
