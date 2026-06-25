package com.supertech.superbatch.recipe.recipe_header.service;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_header.dto.CreateRecipeHeaderRequest;
import com.supertech.superbatch.recipe.recipe_header.dto.RecipeHeaderResponse;
import com.supertech.superbatch.recipe.recipe_header.dto.UpdateRecipeHeaderRequest;

public interface RecipeHeaderService {
    void create(CreateRecipeHeaderRequest request, Long userId);

    List<RecipeHeaderResponse> getAll();

    RecipeHeaderResponse getById(Long id);

    void update(Long id, UpdateRecipeHeaderRequest request);

    void delete(Long id);

}
