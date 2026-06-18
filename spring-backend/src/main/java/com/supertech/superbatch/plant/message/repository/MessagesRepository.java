package com.supertech.superbatch.plant.message.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.message.entity.Messages;

public interface MessagesRepository extends JpaRepository<Messages, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

}
