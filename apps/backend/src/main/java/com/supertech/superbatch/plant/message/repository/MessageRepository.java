package com.supertech.superbatch.plant.message.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.message.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

}
