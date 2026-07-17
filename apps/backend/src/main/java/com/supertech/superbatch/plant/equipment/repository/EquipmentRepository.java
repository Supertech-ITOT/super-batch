package com.supertech.superbatch.plant.equipment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

  boolean existsByNameIgnoreCase(String name);

  boolean existsByUnitsId(Long unitId);

  @EntityGraph(attributePaths = { "units", "creatorUnit" })
  List<Equipment> findByUnitsId(Long unitId);

  @EntityGraph(attributePaths = { "units", "creatorUnit" })
  @Query("select e from Equipment e")
  List<Equipment> findAllWithRelations();

  @EntityGraph(attributePaths = { "units", "creatorUnit" })
  @Query("select e from Equipment e where e.id = :id")
  Optional<Equipment> findByIdWithRelations(Long id);

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