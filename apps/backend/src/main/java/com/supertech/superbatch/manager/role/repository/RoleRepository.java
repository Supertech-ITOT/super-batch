package com.supertech.superbatch.manager.role.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.manager.role.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByNameAndDeletedFalse(String name);

    boolean existsByNameAndDeletedFalse(String name);

    boolean existsByNameAndIdNotAndDeletedFalse(String name, Long id);

    @EntityGraph(attributePaths = { "permissions", "permissions.module" })
    Optional<Role> findByIdAndDeletedFalse(Long id);

    @EntityGraph(attributePaths = { "permissions", "permissions.module" })
    List<Role> findBySystemRoleFalseAndDeletedFalse();
}
