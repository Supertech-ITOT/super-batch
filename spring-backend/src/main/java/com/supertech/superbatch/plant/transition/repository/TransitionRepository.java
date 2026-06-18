package com.supertech.superbatch.plant.transition.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.transition.entity.Transition;

public interface TransitionRepository extends JpaRepository<Transition, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

}