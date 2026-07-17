package com.supertech.superbatch.plant.plant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.plant.plant.entity.Plant;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    boolean existsByNameIgnoreCase(String name);

    @Query("""
                SELECT DISTINCT p
                FROM Plant p
                LEFT JOIN FETCH p.areas a
                LEFT JOIN FETCH a.units u
                LEFT JOIN FETCH u.equipments
                WHERE p.id = :id
            """)
    Optional<Plant> findByIdWithHierarchy(@Param("id") Long id);

    @Query("""
                SELECT DISTINCT p
                FROM Plant p
                LEFT JOIN FETCH p.areas a
                LEFT JOIN FETCH a.units u
                LEFT JOIN FETCH u.equipments e
                ORDER BY p.name, a.name, u.name, e.name
            """)
    List<Plant> findAllHierarchy();
}
