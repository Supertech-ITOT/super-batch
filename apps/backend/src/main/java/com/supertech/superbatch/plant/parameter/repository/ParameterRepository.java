package com.supertech.superbatch.plant.parameter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.parameter.entity.Parameter;

public interface ParameterRepository extends JpaRepository<Parameter, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

}
