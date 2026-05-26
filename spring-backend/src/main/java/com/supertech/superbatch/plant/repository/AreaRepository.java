package com.supertech.superbatch.plant.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.plant.entity.Area;

public interface AreaRepository extends JpaRepository<Area, Long> {

    @Query("""
                SELECT DISTINCT a
                FROM Area a
                LEFT JOIN FETCH a.units u
                LEFT JOIN FETCH u.equipments
                WHERE a.id = :id
            """)
    Optional<Area> findByIdWithHierarchy(@Param("id") Long id);

    @Query("""
                SELECT DISTINCT a
                FROM Area a
                LEFT JOIN FETCH a.units u
                LEFT JOIN FETCH u.equipments
                WHERE a.plant.id = :plantId
            """)
    List<Area> findByPlantId(@Param("plantId") Long plantId);

    @Query("""
                SELECT DISTINCT a
                FROM Area a
                LEFT JOIN FETCH a.units u
                LEFT JOIN FETCH u.equipments e
            """)
    List<Area> findAllHierarchy();

    boolean existsByNameIgnoreCaseAndPlantId(String name, Long plantId);

    boolean existsByPlantId(Long plantId);
}