package com.supertech.superbatch.recipe.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.entity.Recipe;

@Component
public class RecipeMapper {
    public Recipe toEntity(CreateRecipeRequest request) {
        return Recipe.builder()
                .name(request.getName())
                .description(request.getDescription())
                .batchSize(request.getBatchSize())
                .batchSizeUom(request.getBatchSizeUom())
                .build();
    }

    public RecipeResponse toResponse(Recipe recipe) {
        return RecipeResponse.builder() 
                .id(recipe.getId())
                .name(recipe.getName())
                .description(recipe.getDescription())
                .version(recipe.getVersion())
                .status(recipe.getStatus())
                .batchSize(recipe.getBatchSize())
                .batchSizeUom(recipe.getBatchSizeUom())
                .createdAt(recipe.getCreatedAt())
                .updatedAt(recipe.getUpdatedAt())
                .build();
    }
}
