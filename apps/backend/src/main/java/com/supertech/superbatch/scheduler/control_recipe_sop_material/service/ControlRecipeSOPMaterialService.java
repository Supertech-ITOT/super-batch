package com.supertech.superbatch.scheduler.control_recipe_sop_material.service;

import java.util.List;

import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialResponse;

public interface ControlRecipeSOPMaterialService {
    List<ControlRecipeSOPMaterialResponse> getAllByControlRecipe(ControlRecipeSOP controlRecipeSOP);

    void create(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPMaterialRequest> materials);

    void update(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPMaterialRequest> materials);

    void deleteByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP);

}
