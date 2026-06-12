package com.supertech.superbatch.manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.manager.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {

    boolean existsByName(String name);

    @Query("""
            SELECT u
            FROM Users u
            LEFT JOIN FETCH u.role
            WHERE u.email = :email
            """)
    Optional<Users> findByEmail(@Param("email") String email);

}
