package com.supertech.superbatch.recipe.recipe_material.service;

import java.util.List;

import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialRequest;

public interface RecipeMaterialService {
    void create(Recipe recipe, List<RecipeMaterialRequest> materials);

    void update(Recipe recipe, List<RecipeMaterialRequest> materials);

    void deleteByRecipe(Recipe recipe);

    void validate(Transition transition, List<RecipeMaterialRequest> materials);

}
