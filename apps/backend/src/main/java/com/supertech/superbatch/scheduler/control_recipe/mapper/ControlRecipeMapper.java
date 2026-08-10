package com.supertech.superbatch.scheduler.control_recipe.mapper;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;
import com.supertech.superbatch.recipe.recipe_sop_parameter.entity.RecipeSOPParameter;
import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeAudit;
import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.CreateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.EquipmentMappingRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.MasterRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.UnitControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.UpdateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.UserControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.enums.ControlRecipeStatus;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop.mapper.ControlRecipeSOPMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.mapper.ControlRecipeSOPMaterialMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.mapper.ControlRecipeSOPParameterMapper;

@Component
@RequiredArgsConstructor
public class ControlRecipeMapper {
        private final ControlRecipeSOPMapper controlRecipeSOPMapper;
        private final ControlRecipeSOPMaterialMapper controlRecipeSOPMaterialMapper;
        private final ControlRecipeSOPParameterMapper controlRecipeSOPParameterMapper;

        public ControlRecipeResponse toResponse(ControlRecipe controlRecipe) {
                return ControlRecipeResponse.builder()
                                .id(controlRecipe.getId())
                                .name(controlRecipe.getName())
                                .batchNo(controlRecipe.getBatchNo())
                                .unit(toResponse(controlRecipe.getUnit()))
                                .status(controlRecipe.getStatus())
                                .batchSize(controlRecipe.getBatchSize())
                                .recipe(toResponse(controlRecipe.getRecipe()))
                                .shiftIncharge(toResponse(controlRecipe.getShiftIncharge()))
                                .createdBy(toResponse(controlRecipe.getCreatedBy()))
                                .scheduledAt(controlRecipe.getScheduledAt())
                                .createdAt(controlRecipe.getCreatedAt())
                                .updatedAt(controlRecipe.getUpdatedAt())
                                .build();
        }

        public ControlRecipe toEntity(CreateControlRecipeRequest request, Unit unit, Recipe recipe, User createdBy,
                        User shiftIncharge, List<Equipment> equipmentLists) {
                String name = "CR_" + recipe.getName() + "_" + recipe.getUnit().getCode() + "_"
                                + request.batchNo();
                ControlRecipe controlRecipe = ControlRecipe.builder()
                                .name(name)
                                .unit(unit)
                                .batchNo(request.batchNo())
                                .batchSize(request.batchSize())
                                .recipe(recipe)
                                .createdBy(createdBy)
                                .shiftIncharge(shiftIncharge)
                                .scheduledAt(request.scheduledAt())
                                .status(ControlRecipeStatus.SCHEDULED)
                                .build();

                Map<Long, Long> equipmentMapping = request.equipmentMappings() == null
                                ? Collections.emptyMap()
                                : request.equipmentMappings().stream()
                                                .collect(Collectors.toMap(EquipmentMappingRequest::recipeEquipmentId,
                                                                EquipmentMappingRequest::executionEquipmentId));

                Map<Long, Equipment> equipments = equipmentLists.stream()
                                .collect(Collectors.toMap(Equipment::getId, Function.identity()));

                for (RecipeSOP recipeSOP : recipe.getSops()) {

                        ControlRecipeSOP controlRecipeSOP = controlRecipeSOPMapper.toEntity(recipeSOP, controlRecipe,
                                        equipmentMapping, equipments);
                        // Material
                        for (RecipeSOPMaterial material : recipeSOP.getMaterials()) {
                                controlRecipeSOP.getMaterials()
                                                .add(controlRecipeSOPMaterialMapper.toEntity(controlRecipeSOP,
                                                                material));
                        }
                        // Parameter
                        for (RecipeSOPParameter parameter : recipeSOP.getParameters()) {
                                controlRecipeSOP.getParameters()
                                                .add(controlRecipeSOPParameterMapper.toEntity(controlRecipeSOP,
                                                                parameter));
                        }
                        controlRecipe.getSops().add(controlRecipeSOP);
                }
                return controlRecipe;
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
                                .unit(toResponse(recipe.getUnit()))
                                .build();
        }

        private UnitControlRecipeResponse toResponse(Unit unit) {
                return UnitControlRecipeResponse.builder()
                                .id(unit.getId())
                                .name(unit.getName())
                                .capacity(unit.getCapacity())
                                .build();
        }

        public ControlRecipeAudit copy(ControlRecipe controlRecipe) {
                return ControlRecipeAudit.builder()
                                .id(controlRecipe.getId())
                                .batchNo(controlRecipe.getBatchNo())
                                .name(controlRecipe.getName())
                                .recipe(controlRecipe.getRecipe().getName())
                                .unit(controlRecipe.getUnit().getName())
                                .status(controlRecipe.getStatus().name())
                                .batchSize(controlRecipe.getBatchSize())
                                .createdBy(controlRecipe.getCreatedBy().getName())
                                .shiftIncharge(controlRecipe.getShiftIncharge().getName())
                                .scheduledAt(controlRecipe.getScheduledAt())
                                .build();

        }

}
