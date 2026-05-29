package com.supertech.superbatch.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.Parameter;

public interface ParameterRepository extends JpaRepository<Parameter, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsByCodeIgnoreCase(String code);
}
