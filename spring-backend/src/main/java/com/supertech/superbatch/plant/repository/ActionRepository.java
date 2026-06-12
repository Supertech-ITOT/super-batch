package com.supertech.superbatch.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.Action;

public interface ActionRepository extends JpaRepository<Action, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

}
