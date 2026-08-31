package com.supertech.superbatch.scheduler.control_recipe_sop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;

public interface ControlRecipeSOPRepository extends JpaRepository<ControlRecipeSOP, Long> {

  @Override
  @EntityGraph(attributePaths = { "controlRecipe" })
  Optional<ControlRecipeSOP> findById(Long id);

  List<ControlRecipeSOP> findAllByControlRecipeId(Long controlRecipeId);

  Optional<ControlRecipeSOP> findByControlRecipeIdAndStepNo(Long controlRecipeId, Integer stepNo);

  @Modifying(flushAutomatically = true)
  @Query("""
          UPDATE ControlRecipeSOP r
          SET r.stepNo = r.stepNo + :offset
          WHERE r.controlRecipe.id = :controlRecipeId
            AND r.stepNo >= :stepNo
      """)
  void shiftStepNumbersFrom(Long controlRecipeId, Integer stepNo, Integer offset);

  @Modifying(flushAutomatically = true)
  @Query("""
          UPDATE ControlRecipeSOP r
          SET r.stepNo = r.stepNo + :offset
          WHERE r.controlRecipe.id = :controlRecipeId
            AND r.stepNo > :stepNo
      """)
  void shiftStepNumbersAfter(Long controlRecipeId, Integer stepNo, Integer offset);

  @EntityGraph(attributePaths = { "controlRecipe", "action", "transition", "fromEquipment", "toEquipment", "materials",
      "materials.material", "parameters", "parameters.parameter" })
  Optional<ControlRecipeSOP> findWithRelationsById(Long id);

  @EntityGraph(attributePaths = { "controlRecipe", "action", "transition", "fromEquipment", "toEquipment", "materials",
      "materials.material", "parameters", "parameters.parameter" })
  List<ControlRecipeSOP> findWithRelationsByControlRecipeId(Long controlRecipeId);

  @Query("""
      SELECT COALESCE(SUM(m.stdQty), 0)
      FROM ControlRecipeSOP s
      JOIN s.materials m
      WHERE s.controlRecipe.id = :controlRecipeId
      """)
  Double getTotalMaterialQtyByControlRecipeId(Long controlRecipeId);

}
