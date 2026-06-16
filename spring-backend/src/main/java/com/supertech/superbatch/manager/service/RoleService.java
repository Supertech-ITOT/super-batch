package com.supertech.superbatch.manager.service;

import java.util.List;

import com.supertech.superbatch.manager.dto.Role.RoleRequest;
import com.supertech.superbatch.manager.dto.Role.RoleResponse;

public interface RoleService {
    List<RoleResponse> getAll();

    void create(RoleRequest request);

    void update(Long id, RoleRequest request);

    void delete(Long id);
}
