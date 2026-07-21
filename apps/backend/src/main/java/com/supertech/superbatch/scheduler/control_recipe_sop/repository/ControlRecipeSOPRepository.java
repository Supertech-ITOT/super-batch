package com.supertech.superbatch.scheduler.control_recipe_sop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;

public interface ControlRecipeSOPRepository extends JpaRepository<ControlRecipeSOP, Long> {
    List<ControlRecipeSOP> findAllByControlRecipeId(Long controlRecipeId);

    Optional<ControlRecipeSOP> findByControlRecipeIdAndStepNo(Long controlRecipeId, Integer stepNo);

    @Modifying
    @Query("""
                UPDATE ControlRecipeSOP r
                SET r.stepNo = r.stepNo - 1
                WHERE r.controlRecipe.id = :controlRecipeId
                  AND r.stepNo > :stepNo
            """)
    void decrementStepNumbers(Long controlRecipeId, Integer stepNo);

    @Modifying
    @Query("""
                UPDATE ControlRecipeSOP r
                SET r.stepNo = r.stepNo + 1
                WHERE r.controlRecipe.id = :controlRecipeId
                  AND r.stepNo > :stepNo
            """)
    void incrementStepNumbersAfter(Long controlRecipeId, Integer stepNo);

    @Modifying
    @Query("""
                UPDATE ControlRecipeSOP r
                SET r.stepNo = r.stepNo + 1
                WHERE r.controlRecipe.id = :controlRecipeId
                  AND r.stepNo >= :stepNo
            """)
    void incrementStepNumbersFrom(Long controlRecipeId, Integer stepNo);

    @EntityGraph(attributePaths = { "controlRecipe", "action", "transition", "fromEquipment", "toEquipment" })
    Optional<ControlRecipeSOP> findWithRelationsById(Long id);

    @EntityGraph(attributePaths = { "controlRecipe", "action", "transition", "fromEquipment", "toEquipment" })
    List<ControlRecipeSOP> findWithRelationsByControlRecipeId(Long controlRecipeId);

}
