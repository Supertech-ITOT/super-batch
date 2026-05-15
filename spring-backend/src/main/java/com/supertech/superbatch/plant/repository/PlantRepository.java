package com.supertech.superbatch.plant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.plant.entity.Plant;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    boolean existsByNameIgnoreCase(String name);

    @Query("""
                SELECT DISTINCT p
                FROM Plant p
                LEFT JOIN FETCH p.areas a
                LEFT JOIN FETCH a.units u
                LEFT JOIN FETCH u.equipments
            """)
    List<Plant> findAllHierarchy();
}
