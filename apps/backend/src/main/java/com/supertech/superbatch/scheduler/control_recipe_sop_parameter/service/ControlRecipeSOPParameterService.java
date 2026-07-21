package com.supertech.superbatch.scheduler.control_recipe_sop_parameter.service;

import java.util.List;

import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterResponse;

public interface ControlRecipeSOPParameterService {
    List<ControlRecipeSOPParameterResponse> getAllByControlRecipe(ControlRecipeSOP controlRecipeSOP);

    void create(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPParameterRequest> parameters);

    void update(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPParameterRequest> parameters);

    void deleteByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP);

}
