package com.supertech.superbatch.recipe.recipe.service;

import java.util.List;

import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;

public interface RecipeService {

    RecipeResponse getById(Long id);

    List<RecipeResponse> getAllByRecipeHeaderId(Long recipeHeaderId);

    void create(CreateRecipeRequest request);

    void update(UpdateRecipeRequest request);

    void delete(Long id);

    void moveUp(Long recipeId);

    void moveDown(Long recipeId);

    void insertAbove(Long recipeId, CreateRecipeRequest request);

    void insertBelow(Long recipeId, CreateRecipeRequest request);
}
