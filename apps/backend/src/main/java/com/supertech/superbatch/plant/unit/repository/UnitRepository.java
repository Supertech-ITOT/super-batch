package com.supertech.superbatch.plant.unit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.plant.unit.entity.Unit;

public interface UnitRepository extends JpaRepository<Unit, Long> {

    @EntityGraph(attributePaths = { "area", "equipments" })
    Optional<Unit> findByIdAndDeletedFalse(Long id);

    @EntityGraph(attributePaths = { "area", "equipments" })
    List<Unit> findByAreaIdAndDeletedFalse(Long areaId);

    @EntityGraph(attributePaths = { "area", "equipments" })
    @Query("""
                SELECT u
                FROM Unit u
                WHERE u.deleted = false
                ORDER BY u.name ASC
            """)
    List<Unit> findAllHierarchy();

    boolean existsByNameIgnoreCaseAndAreaIdAndDeletedFalse(String name, Long areaId);

    boolean existsByCodeIgnoreCaseAndDeletedFalse(String code);

    boolean existsByNameIgnoreCaseAndAreaIdAndDeletedFalseAndIdNot(String name, Long areaId, Long id);

    boolean existsByCodeIgnoreCaseAndDeletedFalseAndIdNot(String code, Long id);

    boolean existsByAreaIdAndDeletedFalse(Long areaId);

}
