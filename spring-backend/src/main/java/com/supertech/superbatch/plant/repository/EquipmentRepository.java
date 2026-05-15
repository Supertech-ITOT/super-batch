package com.supertech.superbatch.plant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    List<Equipment> findByUnitId(Long unitId);

    boolean existsByNameIgnoreCaseAndUnitId(String name, Long unitId);

    boolean existsByUnitId(Long unitId);
}
