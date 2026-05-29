package com.supertech.superbatch.plant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsByCodeIgnoreCase(String code);
}
