package com.supertech.superbatch.recipe.recipe_parameter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_parameter.entity.RecipeParameter;

public interface RecipeParameterRepository extends JpaRepository<RecipeParameter, Long> {
    void deleteAllByRecipe(Recipe recipe);

    @EntityGraph(attributePaths = { "parameter" })
    List<RecipeParameter> findAllByRecipe(Recipe recipe);
}
