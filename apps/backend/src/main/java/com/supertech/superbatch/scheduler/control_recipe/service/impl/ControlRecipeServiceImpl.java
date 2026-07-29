package com.supertech.superbatch.scheduler.control_recipe.service.impl;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.mapper.BatchMapper;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop.repository.RecipeSOPRepository;
import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.CreateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.EquipmentMappingRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.EquipmentMappingResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.UpdateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.enums.ControlRecipeStatus;
import com.supertech.superbatch.scheduler.control_recipe.mapper.ControlRecipeMapper;
import com.supertech.superbatch.scheduler.control_recipe.repository.ControlRecipeRepository;
import com.supertech.superbatch.scheduler.control_recipe.service.ControlRecipeService;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop.mapper.ControlRecipeSOPMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop.repository.ControlRecipeSOPRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.mapper.ControlRecipeSOPMaterialMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.repository.ControlRecipeSOPMaterialRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.mapper.ControlRecipeSOPParameterMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.repository.ControlRecipeSOPParameterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class ControlRecipeServiceImpl implements ControlRecipeService {
        private final UserRepository userRepository;
        private final UnitRepository unitRepository;
        private final ControlRecipeRepository controlRecipeRepository;
        private final ControlRecipeMapper controlRecipeMapper;
        private final ControlRecipeSOPRepository controlRecipeSOPRepository;
        private final ControlRecipeSOPMapper controlRecipeSOPMapper;
        private final ControlRecipeSOPMaterialRepository controlRecipeSOPMaterialRepository;
        private final ControlRecipeSOPMaterialMapper controlRecipeSOPMaterialMapper;
        private final ControlRecipeSOPParameterRepository controlRecipeSOPParameterRepository;
        private final ControlRecipeSOPParameterMapper controlRecipeSOPParameterMapper;
        private final RecipeRepository recipeRepository;
        private final RecipeSOPRepository recipeSOPRepository;
        private final EquipmentRepository equipmentRepository;
        private final BatchMapper batchMapper;
        private final BatchRepository batchRepository;

        @Override
        public void delete(Long id) {
                ControlRecipe controlRecipe = controlRecipeRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Control Recipe not found."));
                controlRecipeRepository.delete(controlRecipe);
        }

        @Override
        public void create(CreateControlRecipeRequest request, Long userId) {
                if (controlRecipeRepository.existsByBatchNoIgnoreCase(request.batchNo())) {
                        throw new DuplicateResourceException("Batch No already exists.");
                }

                Recipe recipe = recipeRepository.findByIdWithRelations(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                Unit unit = unitRepository.findById(request.unitId())
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found."));

                if (request.batchSize() > unit.getCapacity()) {
                        throw new BadRequestException("Batch size must be under unit capacity.");
                }

                User createdBy = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                User shiftIncharge = userRepository.findById(request.shiftInchargeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Shift Incharge User not found."));

                boolean requiresMapping = !recipe.getUnit().getId().equals(request.unitId());
                if (requiresMapping &&
                                (request.equipmentMappings() == null || request.equipmentMappings().isEmpty())) {
                        throw new BadRequestException("Equipment mapping is required.");
                }

                String controlRecipeName = "CR_" + recipe.getName() + "_" + recipe.getUnit().getCode() + "_"
                                + request.batchNo();

                ControlRecipe controlRecipe = null;
                controlRecipe = controlRecipeMapper.toEntity(request, unit, controlRecipeName, recipe, createdBy,
                                shiftIncharge);
                controlRecipe = controlRecipeRepository.save(controlRecipe);
                createControlRecipeSnapshot(controlRecipe, recipe, request);
        }

        @Override
        public List<ControlRecipeResponse> getAll() {
                List<ControlRecipe> controlRecipes = controlRecipeRepository.findAllWithRelations();
                List<ControlRecipeResponse> controlRecipeResponses = controlRecipes.stream()
                                .sorted(Comparator.comparing(ControlRecipe::getScheduledAt).reversed())
                                .map(controlRecipeMapper::toResponse).toList();
                return controlRecipeResponses;
        }

        @Override
        public ControlRecipeResponse getById(Long id) {
                ControlRecipe controlRecipe = controlRecipeRepository.findByIdWithRelations(id)
                                .orElseThrow(() -> new RuntimeException(" Control Recipe not found."));
                return controlRecipeMapper.toResponse(controlRecipe);
        }

        @Override
        public void update(Long id, UpdateControlRecipeRequest request) {
                if (controlRecipeRepository.existsByBatchNoIgnoreCaseAndIdNot(request.batchNo(), id)) {
                        throw new DuplicateResourceException("Batch No already exist.");
                }
                ControlRecipe controlRecipe = controlRecipeRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Control Recipe not found."));

                if (controlRecipe.getStatus().equals(ControlRecipeStatus.TRANSFER)) {
                        throw new BadRequestException("Transfered batch connot be edit again.");
                }

                User shiftIncharge = userRepository.findById(request.shiftInchargeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Shift Incharge User not found."));

                controlRecipeMapper.updateEntity(controlRecipe, request, shiftIncharge);
                controlRecipeRepository.save(controlRecipe);
        }

        private void createControlRecipeSnapshot(ControlRecipe controlRecipe, Recipe recipe,
                        CreateControlRecipeRequest request) {

                Map<Long, Long> equipmentMapping = request.equipmentMappings() == null
                                ? Collections.emptyMap()
                                : request.equipmentMappings().stream()
                                                .collect(Collectors.toMap(
                                                                EquipmentMappingRequest::recipeEquipmentId,
                                                                EquipmentMappingRequest::executionEquipmentId));

                Map<Long, Equipment> equipments = request.equipmentMappings() == null
                                ? Collections.emptyMap()
                                : equipmentRepository.findAllById(
                                                request.equipmentMappings().stream()
                                                                .map(EquipmentMappingRequest::executionEquipmentId)
                                                                .toList())
                                                .stream()
                                                .collect(Collectors.toMap(
                                                                Equipment::getId,
                                                                Function.identity()));

                List<RecipeSOP> recipeSOPs = recipeSOPRepository.findWithRelationsByRecipeId(recipe.getId());
                for (RecipeSOP recipeSOP : recipeSOPs) {

                        Equipment fromEquipment = recipeSOP.getFromEquipment();
                        if (!equipmentMapping.isEmpty() && recipeSOP.getFromEquipment() != null) {
                                fromEquipment = equipments
                                                .get(equipmentMapping.get(recipeSOP.getFromEquipment().getId()));
                        }

                        Equipment toEquipment = recipeSOP.getToEquipment();
                        if (!equipmentMapping.isEmpty() && recipeSOP.getToEquipment() != null) {
                                toEquipment = equipments.get(equipmentMapping.get(recipeSOP.getToEquipment().getId()));
                        }

                        ControlRecipeSOP controlRecipeSOP = controlRecipeSOPRepository.save(
                                        controlRecipeSOPMapper.toEntity(recipeSOP, controlRecipe, fromEquipment,
                                                        toEquipment));

                        List<ControlRecipeSOPMaterial> materials = recipeSOP.getMaterials()
                                        .stream()
                                        .map(m -> controlRecipeSOPMaterialMapper.toEntity(controlRecipeSOP, m))
                                        .toList();

                        controlRecipeSOPMaterialRepository.saveAll(materials);

                        List<ControlRecipeSOPParameter> parameters = recipeSOP.getParameters()
                                        .stream()
                                        .map(p -> controlRecipeSOPParameterMapper.toEntity(controlRecipeSOP, p))
                                        .toList();

                        controlRecipeSOPParameterRepository.saveAll(parameters);
                }

        }

        @Override
        public List<EquipmentMappingResponse> getRecipeEquipments(Long recipeId, Long unitId) {

                Recipe recipe = recipeRepository.findByIdWithSopsAndEquipment(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                Equipment recipeMainEquipment = equipmentRepository
                                .findByCreatorUnitIdAndEquipmentType(
                                                recipe.getUnit().getId(),
                                                EquipmentType.MAIN_EQUIPMENT)
                                .orElseThrow(() -> new BadRequestException(
                                                "Recipe default unit does not have a main equipment."));

                Equipment selectedMainEquipment = equipmentRepository
                                .findByCreatorUnitIdAndEquipmentType(
                                                unitId,
                                                EquipmentType.MAIN_EQUIPMENT)
                                .orElseThrow(() -> new BadRequestException(
                                                "Selected unit does not have a main equipment."));

                Set<Equipment> equipments = new LinkedHashSet<>();

                for (RecipeSOP step : recipe.getSops()) {

                        if (step.getFromEquipment() != null) {
                                equipments.add(step.getFromEquipment());
                        }

                        if (step.getToEquipment() != null) {
                                equipments.add(step.getToEquipment());
                        }
                }

                return equipments.stream()
                                .map(eq -> {

                                        boolean autoMapped = eq.getId().equals(recipeMainEquipment.getId());

                                        return EquipmentMappingResponse.builder()
                                                        .equipmentId(eq.getId())
                                                        .equipmentName(eq.getName())
                                                        .autoMapped(autoMapped)
                                                        .mappedEquipmentId(
                                                                        autoMapped ? selectedMainEquipment.getId()
                                                                                        : null)
                                                        .build();
                                })
                                .toList();
        }

        @Override
        public void transfer(Long id) {
                ControlRecipe controlRecipe = controlRecipeRepository.findByIdWithRelations(id)
                                .orElseThrow(() -> new RuntimeException("Control Recipe not found."));
                if (controlRecipe.getStatus() == ControlRecipeStatus.TRANSFER) {
                        throw new RuntimeException("Already transferred.");
                }
                Batch batch = batchMapper.toEntity(controlRecipe);
                batchRepository.save(batch);
                controlRecipe.setStatus(ControlRecipeStatus.TRANSFER);
                controlRecipeRepository.save(controlRecipe);
        }
}
