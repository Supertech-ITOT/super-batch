package com.supertech.superbatch.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
