package com.supertech.superbatch.recipe.recipe_sop_material.service;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;

public interface RecipeSOPMaterialService {

    void create(RecipeSOP recipeSOP, List<RecipeSOPMaterialRequest> materials);

    void update(RecipeSOP recipeSOP, List<RecipeSOPMaterialRequest> materials);

    void deleteByRecipeSOP(RecipeSOP recipeSOP);

}
