package com.supertech.superbatch.recipe.recipe.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

import com.supertech.superbatch.manager.user.entity.Users;
import com.supertech.superbatch.plant.common.mapper.UomMapper;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.MaterialRecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UnitRecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.UserRecipeResponse;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;

@Component
@RequiredArgsConstructor
public class RecipeMapper {
    private final UomMapper uomMapper;

    public RecipeResponse toResponse(Recipe recipe) {
        return RecipeResponse.builder()
                .id(recipe.getId())
                .name(recipe.getName())
                .description(recipe.getDescription())
                .status(recipe.getStatus())
                .batchSize(recipe.getBatchSize())
                .materialRecipeResponse(toResponse(recipe.getMaterial()))
                .unitRecipeResponse(toResponse(recipe.getUnit()))
                .userRecipeResponse(toResponse(recipe.getCreatedBy()))
                .createdAt(recipe.getCreatedAt())
                .updatedAt(recipe.getUpdatedAt())
                .build();
    }

    public Recipe toEntity(CreateRecipeRequest request, Material material, Users createdBy, Unit unit) {
        return Recipe.builder()
                .name(request.name())
                .description(request.description())
                .batchSize(request.batchSize())
                .material(material)
                .unit(unit)
                .createdBy(createdBy)
                .status(request.status())
                .build();
    }

    public void updateEntity(Recipe recipe, UpdateRecipeRequest request, Material material,
            Unit unit) {
        recipe.setName(request.name());
        recipe.setDescription(request.description());
        recipe.setBatchSize(request.batchSize());
        recipe.setMaterial(material);
        recipe.setStatus(request.status());
        recipe.setUnit(unit);
    }

    private UserRecipeResponse toResponse(Users users) {
        return UserRecipeResponse.builder()
                .id(users.getId())
                .name(users.getName())
                .email(users.getEmail())
                .build();
    }

    private MaterialRecipeResponse toResponse(Material material) {
        return MaterialRecipeResponse.builder()
                .id(material.getId())
                .name(material.getName())
                .code(material.getCode())
                .build();
    }

    private UnitRecipeResponse toResponse(Unit unit) {
        return UnitRecipeResponse.builder()
                .id(unit.getId())
                .name(unit.getName())
                .code(unit.getCode())
                .batchSizeUom(uomMapper.toResponse(unit.getBatchSizeUom()))
                .build();
    }
}
