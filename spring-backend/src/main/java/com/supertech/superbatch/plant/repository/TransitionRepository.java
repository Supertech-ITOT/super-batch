package com.supertech.superbatch.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.Transition;

public interface TransitionRepository extends JpaRepository<Transition, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

    boolean existsByCodeIgnoreCase(String code);
}