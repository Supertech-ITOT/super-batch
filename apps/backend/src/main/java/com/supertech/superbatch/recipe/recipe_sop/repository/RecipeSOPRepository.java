package com.supertech.superbatch.recipe.recipe_sop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;

public interface RecipeSOPRepository extends JpaRepository<RecipeSOP, Long> {
    List<RecipeSOP> findAllByRecipeId(Long recipeId);

    Optional<RecipeSOP> findByRecipeIdAndStepNo(Long recipeId, Integer stepNo);

    @Modifying(flushAutomatically = true)
    @Query("""
                UPDATE RecipeSOP r
                SET r.stepNo = r.stepNo + :offset
                WHERE r.recipe.id = :recipeId
                  AND r.stepNo >= :stepNo
            """)
    void shiftStepNumbersFrom(Long recipeId, Integer stepNo, Integer offset);

    @Modifying(flushAutomatically = true)
    @Query("""
                UPDATE RecipeSOP r
                SET r.stepNo = r.stepNo + :offset
                WHERE r.recipe.id = :recipeId
                  AND r.stepNo > :stepNo
            """)
    void shiftStepNumbersAfter(Long recipeId, Integer stepNo, Integer offset);

    @EntityGraph(attributePaths = { "recipe", "action", "transition", "fromEquipment", "toEquipment", "materials",
            "materials.material", "parameters", "parameters.parameter" })
    Optional<RecipeSOP> findWithRelationsById(Long id);

    @EntityGraph(attributePaths = { "recipe", "action", "transition", "fromEquipment", "toEquipment", "materials",
            "materials.material", "parameters", "parameters.parameter" })
    List<RecipeSOP> findWithRelationsByRecipeId(Long recipeId);

    @Query("""
            SELECT COALESCE(SUM(m.stdQty), 0)
            FROM RecipeSOP s
            JOIN s.materials m
            WHERE s.recipe.id = :recipeId
            """)
    Double getTotalMaterialQtyByRecipeId(Long recipeId);

    @Query("""
            SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
            FROM RecipeSOP s
            JOIN s.recipe r
            WHERE r.deleted = false
              AND (s.fromEquipment.id = :equipmentId
                   OR s.toEquipment.id = :equipmentId)
            """)
    boolean existsByActiveRecipeAndEquipmentId(Long equipmentId);

    @Query("""
            SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
            FROM RecipeSOP s
            JOIN s.recipe r
            WHERE r.deleted = false
              AND s.transition.id = :transitionId
            """)
    boolean existsByActiveRecipeAndTransitionId(Long transitionId);

    @Query("""
            SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
            FROM RecipeSOP s
            JOIN s.recipe r
            WHERE r.deleted = false
              AND s.action.id = :actionId
            """)
    boolean existsByActiveRecipeAndActionId(Long actionId);

}
