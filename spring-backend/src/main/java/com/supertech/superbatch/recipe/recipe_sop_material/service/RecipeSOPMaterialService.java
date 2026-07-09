package com.supertech.superbatch.recipe.recipe_sop_material.service;

import java.util.List;

import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialResponse;

public interface RecipeSOPMaterialService {

    List<RecipeSOPMaterialResponse> getAllByRecipe(RecipeSOP recipeSOP);

    void create(RecipeSOP recipeSOP, List<RecipeSOPMaterialRequest> materials);

    void update(RecipeSOP recipeSOP, List<RecipeSOPMaterialRequest> materials);

    void deleteByRecipeSOP(RecipeSOP recipeSOP);

    void validate(Transition transition, List<RecipeSOPMaterialRequest> materials);

}
