package com.supertech.superbatch.manager.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.manager.user.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {

        boolean existsByName(String name);

        @Query("""
                        SELECT u
                        FROM Users u
                        LEFT JOIN FETCH u.role
                        WHERE u.email = :email
                        """)
        Optional<Users> findByEmail(@Param("email") String email);

        boolean existsByEmail(String email);

        boolean existsByEmailAndIdNot(String email, Long id);

        @Query("""
                        SELECT DISTINCT u
                        FROM Users u
                        LEFT JOIN FETCH u.role
                        LEFT JOIN FETCH u.createdBy
                        """)
        List<Users> findAllWithRoleAndCreatedBy();

        @Query("""
                        SELECT DISTINCT u
                        FROM Users u
                        LEFT JOIN FETCH u.role
                        LEFT JOIN FETCH u.createdBy
                        WHERE u.id = :id
                        """)
        Optional<Users> findByIdWithRoleAndCreatedBy(Long id);

}
