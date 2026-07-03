package com.supertech.superbatch.recipe.recipe_parameter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_parameter.entity.RecipeParameter;

public interface RecipeParameterRepository extends JpaRepository<RecipeParameter, Long> {
    void deleteAllByRecipe(Recipe recipe);

    List<RecipeParameter> findAllByRecipe(Recipe recipe);
}
