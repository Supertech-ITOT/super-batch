package com.supertech.superbatch.plant.unit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.plant.unit.entity.Unit;

public interface UnitRepository extends JpaRepository<Unit, Long> {

    @EntityGraph(attributePaths = { "area", "equipments" })
    Optional<Unit> findWithHierarchyById(Long id);

    @EntityGraph(attributePaths = { "area", "equipments" })
    List<Unit> findByAreaId(Long areaId);

    @EntityGraph(attributePaths = { "area", "equipments" })
    @Query("""
                SELECT u
                FROM Unit u
                ORDER BY u.name ASC
            """)
    List<Unit> findAllHierarchy();

    boolean existsByNameIgnoreCaseAndAreaId(String name, Long areaId);

    boolean existsByAreaId(Long areaId);

}
