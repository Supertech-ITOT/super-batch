package com.supertech.superbatch.scheduler.control_recipe.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.enums.ControlRecipeStatus;

public interface ControlRecipeRepository extends JpaRepository<ControlRecipe, Long> {
        @Query("SELECT crh FROM ControlRecipe crh WHERE crh.deleted = false")
        @EntityGraph(attributePaths = {
                        "unit",

                        "recipe",
                        "recipe.material",
                        "recipe.unit",

                        "createdBy",
                        "createdBy.role",

                        "shiftIncharge",
                        "shiftIncharge.role"

        })
        List<ControlRecipe> findAllWithRelations();

        @Query("SELECT crh FROM ControlRecipe crh WHERE crh.id = :id AND crh.deleted = false")
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
        Optional<ControlRecipe> findByIdAndDeletedFalse(Long id);

        boolean existsByBatchNoIgnoreCaseAndDeletedFalse(String batchNo);

        boolean existsByBatchNoIgnoreCaseAndIdNotAndDeletedFalse(String batchNo, Long id);

        @EntityGraph(attributePaths = { "recipe", "recipe.material", "unit" })
        List<ControlRecipe> findByStatusAndScheduledAtAfterOrderByScheduledAtAsc(
                        ControlRecipeStatus status,
                        LocalDateTime scheduledAt);

}
