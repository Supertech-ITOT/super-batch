package com.supertech.superbatch.manager.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.manager.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    List<Permission> findByRoleId(Long roleId);

    boolean existsByRoleIdAndModuleId(
            Long roleId,
            Long moduleId);

    Optional<Permission> findByRoleIdAndModuleId(
            Long roleId,
            Long moduleId);
}