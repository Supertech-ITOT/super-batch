package com.supertech.superbatch.recipe.recipe_material.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_material.enitiy.RecipeMaterial;

public interface RecipeMaterialRepository extends JpaRepository<RecipeMaterial, Long> {
    void deleteAllByRecipe(Recipe recipe);

    @EntityGraph(attributePaths = { "material" })
    List<RecipeMaterial> findAllByRecipe(Recipe recipe);
}
