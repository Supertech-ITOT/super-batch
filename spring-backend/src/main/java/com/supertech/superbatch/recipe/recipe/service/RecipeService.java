package com.supertech.superbatch.recipe.recipe.service;

import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;

public interface RecipeService {
    void create(CreateRecipeRequest request);

    void update(UpdateRecipeRequest request);

    void delete(Long id);
}
