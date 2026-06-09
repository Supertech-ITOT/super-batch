package com.supertech.superbatch.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.ParameterMaster;

public interface ParameterMasterRepository extends JpaRepository<ParameterMaster, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsByCodeIgnoreCase(String code);
}