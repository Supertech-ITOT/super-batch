package com.supertech.superbatch.plant.material.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.material.entity.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsById(Long id);

    boolean existsByCodeIgnoreCase(String code);
}
