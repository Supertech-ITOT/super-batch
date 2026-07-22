package com.supertech.superbatch.scheduler.control_recipe_sop_material.service;

import java.util.List;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;

public interface ControlRecipeSOPMaterialService {
    void create(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPMaterialRequest> materials);

    void update(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPMaterialRequest> materials);

    void deleteByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP);

}
