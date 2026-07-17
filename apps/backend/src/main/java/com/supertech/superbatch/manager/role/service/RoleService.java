package com.supertech.superbatch.manager.role.service;

import java.util.List;

import com.supertech.superbatch.manager.role.dto.RoleCreateRequest;
import com.supertech.superbatch.manager.role.dto.RoleResponse;
import com.supertech.superbatch.manager.role.dto.RoleUpdateRequest;

public interface RoleService {
    List<RoleResponse> getAll();

    RoleResponse getById(Long id);

    void create(RoleCreateRequest request);

    void update(Long id, RoleUpdateRequest request);

    void delete(Long id);
}
