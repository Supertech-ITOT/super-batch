package com.supertech.superbatch.plant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.Unit;

public interface UnitRepository extends JpaRepository<Unit, Long> {

    List<Unit> findByAreaId(Long areaId);

    boolean existsByNameIgnoreCaseAndAreaId(String name, Long areaId);

    boolean existsByAreaId(Long areaId);

}
