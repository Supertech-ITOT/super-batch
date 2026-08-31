package com.supertech.superbatch.recipe.recipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.enums.RecipeStatus;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("SELECT r FROM Recipe r WHERE r.deleted = false")
    @EntityGraph(attributePaths = { "material", "unit", "createdBy", "createdBy.role" })
    List<Recipe> findAllWithRelations();

    @Query("SELECT r FROM Recipe r WHERE r.id = :id AND r.deleted = false")
    @EntityGraph(attributePaths = {
            "unit",
            "material",
            "createdBy",
            "createdBy.role",

            "sops.transition",
            "sops.action",
            "sops.fromEquipment",
            "sops.toEquipment",

            "sops.materials",
            "sops.materials.material",

            "sops.parameters",
            "sops.parameters.parameter"
    })
    Optional<Recipe> findByIdAndDeletedFalse(Long id);

    boolean existsByNameIgnoreCaseAndDeletedFalse(String name);

    @Query(" SELECT DISTINCT r FROM Recipe r WHERE r.id = :id AND r.deleted = false")
    @EntityGraph(attributePaths = { "sops", "sops.fromEquipment", "sops.toEquipment", "unit" })
    Optional<Recipe> findByIdWithSopsAndEquipment(Long id);

    @EntityGraph(attributePaths = { "material", "unit", "createdBy", "createdBy.role" })
    List<Recipe> findAllByMaterialIdAndStatusAndDeletedFalse(Long materialId, RecipeStatus status);

}
