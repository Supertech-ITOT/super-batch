package com.supertech.superbatch.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.TransitionMaster;

public interface TransitionMasterRepository extends JpaRepository<TransitionMaster, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

    boolean existsByCodeIgnoreCase(String code);
}