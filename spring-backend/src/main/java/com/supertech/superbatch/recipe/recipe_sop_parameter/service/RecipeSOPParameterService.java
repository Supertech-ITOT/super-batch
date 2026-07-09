package com.supertech.superbatch.recipe.recipe_sop_parameter.service;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterRequest;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterResponse;

public interface RecipeSOPParameterService {

    List<RecipeSOPParameterResponse> getAllByRecipe(RecipeSOP recipeSOP);

    void create(RecipeSOP recipeSOP, List<RecipeSOPParameterRequest> parameters);

    void update(RecipeSOP recipeSOP, List<RecipeSOPParameterRequest> parameters);

    void deleteByRecipeSOP(RecipeSOP recipeSOP);
}