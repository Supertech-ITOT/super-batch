package com.supertech.superbatch.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.manager.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {

    boolean existsByName(String name);

}
