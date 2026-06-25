package com.supertech.superbatch.recipe.recipe_header.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;

import lombok.RequiredArgsConstructor;

import com.supertech.superbatch.manager.user.entity.Users;
import com.supertech.superbatch.plant.common.mapper.UomMapper;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.recipe.recipe_header.dto.CreateRecipeHeaderRequest;
import com.supertech.superbatch.recipe.recipe_header.dto.MaterialRecipeHeaderResponse;
import com.supertech.superbatch.recipe.recipe_header.dto.RecipeHeaderResponse;
import com.supertech.superbatch.recipe.recipe_header.dto.UnitRecipeHeaderResponse;
import com.supertech.superbatch.recipe.recipe_header.dto.UpdateRecipeHeaderRequest;
import com.supertech.superbatch.recipe.recipe_header.dto.UserRecipeHeaderResponse;

@Component
@RequiredArgsConstructor
public class RecipeHeaderMapper {
    private final UomMapper uomMapper;

    public RecipeHeaderResponse toResponse(RecipeHeader recipeHeader) {
        return RecipeHeaderResponse.builder()
                .id(recipeHeader.getId())
                .name(recipeHeader.getName())
                .description(recipeHeader.getDescription())
                .status(recipeHeader.getStatus())
                .batchSize(recipeHeader.getBatchSize())
                .materialRecipeHeaderResponse(toResponse(recipeHeader.getMaterial()))
                .unitRecipeHeaderResponse(toResponse(recipeHeader.getUnit()))
                .userRecipeHeaderResponse(toResponse(recipeHeader.getCreatedBy()))
                .createdAt(recipeHeader.getCreatedAt())
                .updatedAt(recipeHeader.getUpdatedAt())
                .build();
    }

    public RecipeHeader toEntity(CreateRecipeHeaderRequest request, Material material, Users createdBy, Unit unit) {
        return RecipeHeader.builder()
                .name(request.name())
                .description(request.description())
                .batchSize(request.batchSize())
                .material(material)
                .unit(unit)
                .createdBy(createdBy)
                .status(request.status())
                .build();
    }

    public void updateEntity(RecipeHeader recipeHeader, UpdateRecipeHeaderRequest request, Material material,
            Unit unit) {
        recipeHeader.setName(request.name());
        recipeHeader.setDescription(request.description());
        recipeHeader.setBatchSize(request.batchSize());
        recipeHeader.setMaterial(material);
        recipeHeader.setUnit(unit);
    }

    private UserRecipeHeaderResponse toResponse(Users users) {
        return UserRecipeHeaderResponse.builder()
                .id(users.getId())
                .name(users.getName())
                .email(users.getEmail())
                .build();
    }

    private MaterialRecipeHeaderResponse toResponse(Material material) {
        return MaterialRecipeHeaderResponse.builder()
                .id(material.getId())
                .name(material.getName())
                .code(material.getCode())
                .build();
    }

    private UnitRecipeHeaderResponse toResponse(Unit unit) {
        return UnitRecipeHeaderResponse.builder()
                .id(unit.getId())
                .name(unit.getName())
                .code(unit.getCode())
                .batchSizeUom(uomMapper.toResponse(unit.getBatchSizeUom()))
                .build();
    }
}
