package com.supertech.superbatch.plant.equipment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    boolean existsByNameIgnoreCaseAndDeletedFalse(String name);

    boolean existsByCodeIgnoreCaseAndDeletedFalse(String code);

    boolean existsByNameIgnoreCaseAndDeletedFalseAndIdNot(String name, Long id);

    boolean existsByCodeIgnoreCaseAndDeletedFalseAndIdNot(String code, Long id);

    boolean existsByUnitsIdAndDeletedFalse(Long unitId);

    @EntityGraph(attributePaths = { "units", "creatorUnit" })
    List<Equipment> findByUnitsIdAndDeletedFalse(Long unitId);

    @EntityGraph(attributePaths = { "units", "creatorUnit" })
    @Query("""
                SELECT e
                FROM Equipment e
                WHERE e.deleted = false
                ORDER BY e.name ASC
            """)
    List<Equipment> findAllWithRelations();

    @EntityGraph(attributePaths = { "units", "creatorUnit" })
    Optional<Equipment> findByIdAndDeletedFalse(Long id);

    @Query("""
                SELECT COUNT(e) > 0
                FROM Equipment e
                JOIN e.units u
                WHERE u.id = :unitId
                  AND e.deleted = false
                  AND NOT (
                      e.creatorUnit.id = :unitId
                      AND e.equipmentType = com.supertech.superbatch.plant.equipment.enums.EquipmentType.MAIN_EQUIPMENT
                  )
            """)
    boolean existsActiveOtherEquipmentByUnitId(Long unitId);

    Optional<Equipment> findByCreatorUnitIdAndEquipmentTypeAndDeletedFalse(
            Long creatorUnitId,
            EquipmentType equipmentType);

    @Query("""
                SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END
                FROM Equipment e
                JOIN e.units u
                WHERE e.id = :equipmentId
                    AND e.deleted = false
                    AND u.id <> :unitId
                    AND u.deleted = false
            """)
    boolean existsActiveOtherUnit(@Param("equipmentId") Long equipmentId, @Param("unitId") Long unitId);
}