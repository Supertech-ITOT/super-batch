package com.supertech.superbatch.plant.area.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.plant.area.entity.Area;

public interface AreaRepository extends JpaRepository<Area, Long> {

    @EntityGraph(attributePaths = { "plant", "units", "units.equipments" })
    Optional<Area> findWithHierarchyById(Long id);

    @EntityGraph(attributePaths = { "plant", "units", "units.equipments" })
    List<Area> findByPlantId(Long plantId);

    @EntityGraph(attributePaths = { "plant", "units", "units.equipments" })
    @Query("""
            SELECT a
            FROM Area a
            ORDER BY a.name ASC
            """)
    List<Area> findAllHierarchy();

    boolean existsByNameIgnoreCaseAndPlantId(String name, Long plantId);

    boolean existsByPlantId(Long plantId);
}