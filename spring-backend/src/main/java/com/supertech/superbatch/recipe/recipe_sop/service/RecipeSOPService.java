package com.supertech.superbatch.recipe.recipe_sop.service;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop.dto.CreateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.UpdateRecipeSOPRequest;

public interface RecipeSOPService {

    RecipeSOPResponse getById(Long id);

    List<RecipeSOPResponse> getAllByRecipeHeaderId(Long recipeHeaderId);

    void create(CreateRecipeSOPRequest request);

    void update(UpdateRecipeSOPRequest request);

    void delete(Long id);

    void moveUp(Long recipeId);

    void moveDown(Long recipeId);

    void insertAbove(Long recipeId, CreateRecipeSOPRequest request);

    void insertBelow(Long recipeId, CreateRecipeSOPRequest request);
}
