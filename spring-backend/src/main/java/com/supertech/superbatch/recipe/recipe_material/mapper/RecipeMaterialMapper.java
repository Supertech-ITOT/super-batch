package com.supertech.superbatch.recipe.recipe_material.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialRequest;
import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialResponse;
import com.supertech.superbatch.recipe.recipe_material.enitiy.RecipeMaterial;

@Component
public class RecipeMaterialMapper {

    public RecipeMaterialResponse toResponse(RecipeMaterial recipeMaterial) {
        return RecipeMaterialResponse.builder()
                .id(recipeMaterial.getId())
                .materialId(recipeMaterial.getMaterial().getId())
                .materialName(recipeMaterial.getMaterial().getName())
                .stdQty(recipeMaterial.getStdQty())
                .build();
    }

    public List<RecipeMaterialResponse> toResponseList(List<RecipeMaterial> recipeMaterials) {
        return recipeMaterials.stream().map(this::toResponse).toList();
    }

    public RecipeMaterial toEntity(Recipe recipe, Material material, RecipeMaterialRequest request) {
        return RecipeMaterial.builder()
                .recipe(recipe)
                .material(material)
                .stdQty(request.stdQty())
                .build();
    }
}
