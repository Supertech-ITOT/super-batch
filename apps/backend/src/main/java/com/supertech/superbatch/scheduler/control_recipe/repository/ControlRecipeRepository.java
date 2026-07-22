package com.supertech.superbatch.scheduler.control_recipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;

public interface ControlRecipeRepository extends JpaRepository<ControlRecipe, Long> {
        @Query("SELECT crh FROM ControlRecipe crh")
        @EntityGraph(attributePaths = { "recipe", "recipe.material", "recipe.unit", "recipe.unit.batchSizeUom",
                        "createdBy",
                        "createdBy.role", "shiftIncharge", "shiftIncharge.role" })
        List<ControlRecipe> findAllWithRelations();

        @Query("SELECT crh FROM ControlRecipe crh WHERE crh.id = :id")
        @EntityGraph(attributePaths = { "recipe", "recipe.material", "recipe.unit", "recipe.unit.batchSizeUom",
                        "createdBy",
                        "createdBy.role", "shiftIncharge", "shiftIncharge.role" })
        Optional<ControlRecipe> findByIdWithRelations(Long id);

        List<ControlRecipe> findByRecipeId(Long recipeId);

        boolean existsByBatchNoIgnoreCase(String batchNo);

        boolean existsByBatchNoIgnoreCaseAndIdNot(String batchNo, Long id);

        boolean existsByRecipeId(Long recipeId);

        long countByRecipeId(Long recipeId);

}
