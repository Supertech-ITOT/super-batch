package com.supertech.superbatch.plant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.Area;

public interface AreaRepository extends JpaRepository<Area, Long> {

    List<Area> findByPlantId(Long plantId);

    boolean existsByNameIgnoreCaseAndPlantId(String name, Long plantId);

    boolean existsByPlantId(Long plantId);
}