package com.supertech.superbatch.recipe.recipe_sop_material.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;

public interface RecipeSOPMaterialRepository extends JpaRepository<RecipeSOPMaterial, Long> {
    void deleteAllByRecipeSOP(RecipeSOP recipe);

    @EntityGraph(attributePaths = { "material" })
    List<RecipeSOPMaterial> findAllByRecipeSOP(RecipeSOP recipe);
}
