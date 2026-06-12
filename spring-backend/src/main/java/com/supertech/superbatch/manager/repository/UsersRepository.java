package com.supertech.superbatch.manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.manager.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {

    boolean existsByName(String name);

    Optional<Users> findByEmail(String email);

}
