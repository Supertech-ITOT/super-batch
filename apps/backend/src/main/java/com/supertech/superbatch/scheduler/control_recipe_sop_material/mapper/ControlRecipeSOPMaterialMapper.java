package com.supertech.superbatch.scheduler.control_recipe_sop_material.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.controlrecipe_sop.entity.ControlRecipeSOP;

@Component
public class ControlRecipeSOPMaterialMapper {
    public ControlRecipeSOPMaterialResponse toResponse(ControlRecipeSOPMaterial controlRecipeSOPMaterial) {
        return ControlRecipeSOPMaterialResponse.builder()
                .id(controlRecipeSOPMaterial.getId())
                .materialId(controlRecipeSOPMaterial.getMaterial().getId())
                .materialName(controlRecipeSOPMaterial.getMaterial().getName())
                .stdQty(controlRecipeSOPMaterial.getStdQty())
                .build();
    }

    public List<ControlRecipeSOPMaterialResponse> toResponseList(
            List<ControlRecipeSOPMaterial> controlRecipeSOPMaterials) {
        return controlRecipeSOPMaterials.stream().map(this::toResponse).toList();
    }

    public ControlRecipeSOPMaterial toEntity(ControlRecipeSOP controlRecipeSOP, Material material,
            ControlRecipeSOPMaterialRequest request) {
        return ControlRecipeSOPMaterial.builder()
                .controlRecipeSOP(controlRecipeSOP)
                .material(material)
                .stdQty(request.stdQty())
                .build();
    }

}
