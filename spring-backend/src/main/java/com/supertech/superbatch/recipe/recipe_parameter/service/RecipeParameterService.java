package com.supertech.superbatch.recipe.recipe_parameter.service;

import java.util.List;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterRequest;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterResponse;

public interface RecipeParameterService {

    List<RecipeParameterResponse> getAllByRecipe(Recipe recipe);

    void create(Recipe recipe, List<RecipeParameterRequest> parameters);

    void update(Recipe recipe, List<RecipeParameterRequest> parameters);

    void deleteByRecipe(Recipe recipe);
}