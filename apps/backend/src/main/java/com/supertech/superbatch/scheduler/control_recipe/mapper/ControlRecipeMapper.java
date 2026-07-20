package com.supertech.superbatch.scheduler.control_recipe.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.plant.common.mapper.UomMapper;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.CreateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.MasterRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.UpdateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.UserControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.enums.ControlRecipeStatus;

@Component
@RequiredArgsConstructor
public class ControlRecipeMapper {
    private final UomMapper uomMapper;

    public ControlRecipeResponse toResponse(ControlRecipe controlRecipe) {
        return ControlRecipeResponse.builder()
                .id(controlRecipe.getId())
                .name(controlRecipe.getName())
                .batchNo(controlRecipe.getBatchNo())
                .status(controlRecipe.getStatus())
                .batchSize(controlRecipe.getBatchSize())
                .recipe(toResponse(controlRecipe.getRecipe()))
                .shiftIncharge(toResponse(controlRecipe.getShiftIncharge()))
                .createdBy(toResponse(controlRecipe.getCreatedBy()))
                .sheduledAt(controlRecipe.getScheduledAt())
                .createdAt(controlRecipe.getCreatedAt())
                .updatedAt(controlRecipe.getUpdatedAt())
                .build();
    }

    public ControlRecipe toEntity(CreateControlRecipeRequest request, String name, Recipe recipe, User createdBy,
            User shiftIncharge) {
        return ControlRecipe.builder()
                .name(name)
                .batchNo(request.batchNo())
                .batchSize(request.batchSize())
                .recipe(recipe)
                .createdBy(createdBy)
                .shiftIncharge(shiftIncharge)
                .scheduledAt(request.scheduledAt())
                .status(ControlRecipeStatus.SHEDULED)
                .build();
    }

    public void updateEntity(ControlRecipe recipe, UpdateControlRecipeRequest request, User shiftIncharge) {
        recipe.setBatchSize(request.batchSize());
        recipe.setBatchNo(request.batchNo());
        recipe.setScheduledAt(request.scheduledAt());
        recipe.setShiftIncharge(shiftIncharge);
    }

    private UserControlRecipeResponse toResponse(User user) {
        return UserControlRecipeResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .build();
    }

    private MasterRecipeResponse toResponse(Recipe recipe) {
        return MasterRecipeResponse.builder()
                .id(recipe.getId())
                .name(recipe.getName())
                .description(recipe.getDescription())
                .product(recipe.getMaterial().getName())
                .unit(recipe.getUnit().getName())
                .batchSizeUom(uomMapper.toResponse(recipe.getUnit().getBatchSizeUom()))
                .build();
    }

}
