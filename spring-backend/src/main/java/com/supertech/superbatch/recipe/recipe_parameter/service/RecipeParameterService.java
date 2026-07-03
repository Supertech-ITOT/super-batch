package com.supertech.superbatch.recipe.recipe_parameter.service;

import java.util.List;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterRequest;

public interface RecipeParameterService {

    void create(Recipe recipe, List<RecipeParameterRequest> parameters);

    void update(Recipe recipe, List<RecipeParameterRequest> parameters);

    void deleteByRecipe(Recipe recipe);
}