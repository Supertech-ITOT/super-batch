package com.supertech.superbatch.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.manager.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    boolean existsByRoleIdAndModuleId(Long roleId, Long moduleId);
}
