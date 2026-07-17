package com.supertech.superbatch.recipe.recipe_sop_material.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialResponse;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;

@Component
public class RecipeSOPMaterialMapper {

    public RecipeSOPMaterialResponse toResponse(RecipeSOPMaterial recipeSOPMaterial) {
        return RecipeSOPMaterialResponse.builder()
                .id(recipeSOPMaterial.getId())
                .materialId(recipeSOPMaterial.getMaterial().getId())
                .materialName(recipeSOPMaterial.getMaterial().getName())
                .stdQty(recipeSOPMaterial.getStdQty())
                .build();
    }

    public List<RecipeSOPMaterialResponse> toResponseList(List<RecipeSOPMaterial> recipeSOPMaterials) {
        return recipeSOPMaterials.stream().map(this::toResponse).toList();
    }

    public RecipeSOPMaterial toEntity(RecipeSOP recipeSOP, Material material, RecipeSOPMaterialRequest request) {
        return RecipeSOPMaterial.builder()
                .recipeSOP(recipeSOP)
                .material(material)
                .stdQty(request.stdQty())
                .build();
    }
}
