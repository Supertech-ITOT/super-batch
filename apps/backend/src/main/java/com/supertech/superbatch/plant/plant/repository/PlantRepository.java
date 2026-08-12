package com.supertech.superbatch.plant.plant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.plant.plant.entity.Plant;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    boolean existsByNameIgnoreCaseAndDeletedFalse(String name);

    @EntityGraph(attributePaths = { "areas", "areas.units", "areas.units.equipments" })
    Optional<Plant> findByIdAndDeletedFalse(Long id);

    @EntityGraph(attributePaths = { "areas", "areas.units", "areas.units.equipments" })
    @Query("""
            SELECT p
            FROM Plant p
            WHERE p.deleted = false
            ORDER BY p.name
            """)
    List<Plant> findAllHierarchy();
}
