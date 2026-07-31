package com.supertech.superbatch.manager.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.supertech.superbatch.manager.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

        boolean existsByNameAndDeletedFalse(String name);

        boolean existsByEmailAndDeletedFalse(String email);

        boolean existsByEmailAndIdNotAndDeletedFalse(String email, Long id);

        long countByRoleIdAndDeletedFalse(Long roleId);

        boolean existsByEmailAndIdNot(String email, Long id);

        @EntityGraph(attributePaths = { "role", "createdBy" })
        Optional<User> findByEmailAndDeletedFalse(String email);

        @EntityGraph(attributePaths = { "role", "role.permissions", "role.permissions.module", "createdBy" })
        Optional<User> findByIdAndDeletedFalse(Long id);

        @EntityGraph(attributePaths = { "role", "role.permissions", "role.permissions.module", "createdBy" })
        List<User> findByDeletedFalseAndSystemAccountFalse();

}
