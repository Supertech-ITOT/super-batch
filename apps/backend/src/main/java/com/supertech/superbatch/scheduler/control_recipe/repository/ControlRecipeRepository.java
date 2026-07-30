package com.supertech.superbatch.scheduler.control_recipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;

public interface ControlRecipeRepository extends JpaRepository<ControlRecipe, Long> {
        @Query("SELECT crh FROM ControlRecipe crh")
        @EntityGraph(attributePaths = {
                        "unit",

                        "recipe",
                        "recipe.material",
                        "recipe.unit",

                        "createdBy",
                        "createdBy.role",

                        "shiftIncharge",
                        "shiftIncharge.role",

                        "sops.transition",
                        "sops.action",
                        "sops.fromEquipment",
                        "sops.toEquipment",

                        "sops.materials",
                        "sops.materials.material",

                        "sops.parameters",
                        "sops.parameters.parameter"
        })
        List<ControlRecipe> findAllWithRelations();

        @Query("SELECT crh FROM ControlRecipe crh WHERE crh.id = :id")
        @EntityGraph(attributePaths = {
                        "unit",

                        "recipe",
                        "recipe.material",
                        "recipe.unit",

                        "createdBy",
                        "createdBy.role",

                        "shiftIncharge",
                        "shiftIncharge.role",

                        "sops.transition",
                        "sops.action",
                        "sops.fromEquipment",
                        "sops.toEquipment",

                        "sops.materials",
                        "sops.materials.material",

                        "sops.parameters",
                        "sops.parameters.parameter"
        })
        Optional<ControlRecipe> findByIdWithRelations(Long id);

        List<ControlRecipe> findByRecipeId(Long recipeId);

        boolean existsByBatchNoIgnoreCase(String batchNo);

        boolean existsByBatchNoIgnoreCaseAndIdNot(String batchNo, Long id);

        boolean existsByRecipeId(Long recipeId);

        long countByRecipeId(Long recipeId);

}
