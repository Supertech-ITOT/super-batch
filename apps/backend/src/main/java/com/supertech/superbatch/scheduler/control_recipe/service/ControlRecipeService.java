package com.supertech.superbatch.scheduler.control_recipe.service;

import java.util.List;

import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;

public interface ControlRecipeService {
    void create(CreateRecipeRequest request, Long userId);

    List<RecipeResponse> getAll();

    RecipeResponse getById(Long id);

    void update(Long id, UpdateRecipeRequest request);

    void delete(Long id);

}
