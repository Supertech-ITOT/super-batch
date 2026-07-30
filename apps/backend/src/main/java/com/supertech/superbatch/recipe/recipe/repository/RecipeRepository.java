package com.supertech.superbatch.recipe.recipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("SELECT rh FROM Recipe rh")
    @EntityGraph(attributePaths = { "material", "unit", "createdBy" })
    List<Recipe> findAllWithRelations();

    @Query("SELECT rh FROM Recipe rh WHERE rh.id = :id")
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
    Optional<Recipe> findByIdWithRelations(Long id);

    boolean existsByNameIgnoreCase(String name);

    @Query(" SELECT DISTINCT r FROM Recipe r WHERE r.id = :id")
    @EntityGraph(attributePaths = { "sops", "sops.fromEquipment", "sops.toEquipment", "unit" })
    Optional<Recipe> findByIdWithSopsAndEquipment(Long id);

}
