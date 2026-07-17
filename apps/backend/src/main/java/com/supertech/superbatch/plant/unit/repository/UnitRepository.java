package com.supertech.superbatch.plant.unit.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.plant.unit.entity.Unit;

public interface UnitRepository extends JpaRepository<Unit, Long> {

    @Query("""
                SELECT DISTINCT u
                FROM Unit u
                LEFT JOIN FETCH u.equipments
                WHERE u.id = :id
            """)
    Optional<Unit> findByIdWithHierarchy(@Param("id") Long id);

    @Query("""
                SELECT DISTINCT u
                FROM Unit u
                LEFT JOIN FETCH u.equipments
                WHERE u.area.id = :areaId
            """)
    List<Unit> findByAreaId(@Param("areaId") Long areaId);

    @Query("""
                SELECT DISTINCT u
                FROM Unit u
                LEFT JOIN FETCH u.equipments e
            """)
    List<Unit> findAllHierarchy();

    boolean existsByNameIgnoreCaseAndAreaId(String name, Long areaId);

    boolean existsByAreaId(Long areaId);

}
