package com.supertech.superbatch.plant.equipment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

        @Query("""
                        SELECT DISTINCT e
                        FROM Equipment e
                        JOIN FETCH e.units u
                        WHERE u.id = :unitId
                        """)
        List<Equipment> findByUnitId(Long unitId);

        boolean existsByNameIgnoreCase(String name);

        @Query("""
                        SELECT COUNT(e) > 0
                        FROM Equipment e
                        JOIN e.units u
                        WHERE u.id = :unitId
                        """)
        boolean existsByUnitId(Long unitId);

        @Query("""
                        SELECT DISTINCT e
                        FROM Equipment e
                        LEFT JOIN FETCH e.units
                        """)
        List<Equipment> findAllWithUnits();

        @Query("""
                        SELECT DISTINCT e
                        FROM Equipment e
                        LEFT JOIN FETCH e.units
                        WHERE e.id = :id
                        """)
        Optional<Equipment> findByIdWithUnits(Long id);

        @Query("""
                            SELECT COUNT(e) > 0
                            FROM Equipment e
                            JOIN e.units u
                            WHERE u.id = :unitId
                              AND e.creatorUnit IS NULL
                        """)
        boolean existsNonCreatorEquipmentByUnitId(Long unitId);

        @Query("""
                            SELECT COUNT(e) > 0
                            FROM Equipment e
                            JOIN e.units u
                            WHERE u.id = :unitId
                              AND e.creatorUnit <> u
                        """)
        boolean existsAssignedEquipmentOtherThanMain(Long unitId);

        Optional<Equipment> findByCreatorUnitIdAndEquipmentType(
                        Long creatorUnitId,
                        EquipmentType equipmentType);
}