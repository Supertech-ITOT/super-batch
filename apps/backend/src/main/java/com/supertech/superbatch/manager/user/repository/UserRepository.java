package com.supertech.superbatch.manager.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.supertech.superbatch.manager.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

        boolean existsByName(String name);

        boolean existsByEmail(String email);

        @EntityGraph(attributePaths = { "role", "createdBy" })
        Optional<User> findByEmail(String email);

        boolean existsByEmailAndIdNot(String email, Long id);

        @Override
        @EntityGraph(attributePaths = { "role", "createdBy" })
        List<User> findAll();

        @Override
        @EntityGraph(attributePaths = { "role", "createdBy" })
        Optional<User> findById(Long id);
}
