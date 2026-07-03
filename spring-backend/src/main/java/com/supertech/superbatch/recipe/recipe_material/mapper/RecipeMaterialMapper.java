package com.supertech.superbatch.recipe.recipe_material.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialRequest;
import com.supertech.superbatch.recipe.recipe_material.enitiy.RecipeMaterial;

@Component
public class RecipeMaterialMapper {
    public RecipeMaterial toEntity(Recipe recipe, Material material, RecipeMaterialRequest request) {
        return RecipeMaterial.builder()
                .recipe(recipe)
                .material(material)
                .stdQty(request.stdQty())
                .build();
    }
}
