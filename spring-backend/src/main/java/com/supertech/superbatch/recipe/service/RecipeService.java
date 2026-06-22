package com.supertech.superbatch.recipe.service;

import java.util.List;

import com.supertech.superbatch.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.dto.UpdateRecipeRequest;

public interface RecipeService {
    RecipeResponse create(CreateRecipeRequest request);

    List<RecipeResponse> getAll();

    RecipeResponse getById(Long id);

    RecipeResponse update(Long id, UpdateRecipeRequest request);

    void delete(Long id);

}
