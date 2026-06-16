package com.supertech.superbatch.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.Messages;

public interface MessagesRepository extends JpaRepository<Messages, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

}
