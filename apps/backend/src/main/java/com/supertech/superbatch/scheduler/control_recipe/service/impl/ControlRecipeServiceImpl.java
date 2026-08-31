package com.supertech.superbatch.scheduler.control_recipe.service.impl;

import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeAudit;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.mapper.BatchMapper;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.enums.RecipeStatus;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
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
import com.supertech.superbatch.scheduler.control_recipe_sop.repository.ControlRecipeSOPRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ControlRecipeServiceImpl implements ControlRecipeService {
        private final UserRepository userRepository;
        private final UnitRepository unitRepository;
        private final ControlRecipeRepository controlRecipeRepository;
        private final ControlRecipeMapper controlRecipeMapper;
        private final RecipeRepository recipeRepository;
        private final EquipmentRepository equipmentRepository;
        private final BatchMapper batchMapper;
        private final BatchRepository batchRepository;
        private final BatchAuditService batchAuditService;
        private final ControlRecipeSOPRepository controlRecipeSOPRepository;

        @Override
        @Transactional
        public void delete(Long id, Long currentUserId) {
                ControlRecipe controlRecipe = getControlRecipe(id);
                User deletedBy = getUser(currentUserId, "User not found.");
                controlRecipe.setDeleted(true);
                controlRecipe.setDeletedAt(LocalDateTime.now());
                controlRecipe.setDeletedBy(deletedBy);
                controlRecipeRepository.save(controlRecipe);
                audit(BatchAuditAction.DELETED, null, controlRecipeMapper.copy(controlRecipe));
        }

        @Override
        @Transactional
        public void create(CreateControlRecipeRequest request, Long userId) {
                if (controlRecipeRepository.existsByBatchNoIgnoreCaseAndDeletedFalse(request.batchNo())) {
                        throw new DuplicateResourceException("Batch No already exists.");
                }

                Recipe recipe = recipeRepository.findByIdAndDeletedFalse(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                if (recipe.getStatus() != RecipeStatus.RELEASED) {
                        throw new BadRequestException(
                                        "Choose diffrent recipe as it is not released in production yet.");
                }

                Unit unit = unitRepository.findByIdAndDeletedFalse(request.unitId())
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found."));

                if (request.batchSize() > unit.getCapacity()) {
                        throw new BadRequestException("Batch size must be under unit capacity.");
                }

                User createdBy = getUser(userId, "User not found.");

                User shiftIncharge = getUser(request.shiftInchargeId(), "Shift Incharge User not found.");

                boolean requiresMapping = !recipe.getUnit().getId().equals(request.unitId());
                if (requiresMapping &&
                                (request.equipmentMappings() == null || request.equipmentMappings().isEmpty())) {
                        throw new BadRequestException("Equipment mapping is required.");
                }

                List<Equipment> equipmentLists = request.equipmentMappings() == null
                                ? List.of()
                                : equipmentRepository.findAllById(request.equipmentMappings().stream()
                                                .map(EquipmentMappingRequest::executionEquipmentId).toList());

                ControlRecipe controlRecipe = controlRecipeMapper.toEntity(request, unit, recipe, createdBy,
                                shiftIncharge, equipmentLists);
                controlRecipeRepository.save(controlRecipe);

                audit(BatchAuditAction.CREATED, null, controlRecipeMapper.copy(controlRecipe));

        }

        @Override
        public List<ControlRecipeResponse> getAll() {
                return controlRecipeRepository.findAllWithRelations()
                                .stream()
                                .sorted(Comparator.comparing(ControlRecipe::getScheduledAt).reversed())
                                .map(controlRecipeMapper::toResponse)
                                .toList();
        }

        @Override
        public ControlRecipeResponse getById(Long id) {
                ControlRecipe controlRecipe = getControlRecipe(id);
                return controlRecipeMapper.toResponse(controlRecipe);
        }

        @Override
        @Transactional
        public void update(Long id, UpdateControlRecipeRequest request) {
                if (controlRecipeRepository.existsByBatchNoIgnoreCaseAndIdNotAndDeletedFalse(request.batchNo(), id)) {
                        throw new DuplicateResourceException("Batch No already exist.");
                }
                ControlRecipe controlRecipe = getControlRecipe(id);

                if (controlRecipe.getStatus().equals(ControlRecipeStatus.TRANSFERRED)) {
                        throw new BadRequestException("Transferred batch cannot be edit again.");
                }

                User shiftIncharge = getUser(request.shiftInchargeId(), "Shift Incharge User not found.");
                ControlRecipeAudit oldData = controlRecipeMapper.copy(controlRecipe);
                controlRecipeMapper.updateEntity(controlRecipe, request, shiftIncharge);
                controlRecipeRepository.save(controlRecipe);
                audit(BatchAuditAction.UPDATED, oldData, controlRecipeMapper.copy(controlRecipe));

        }

        @Override
        @Transactional
        public List<EquipmentMappingResponse> getRecipeEquipments(Long recipeId, Long unitId) {

                Recipe recipe = recipeRepository.findByIdWithSopsAndEquipment(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                Equipment recipeMainEquipment = equipmentRepository
                                .findByCreatorUnitIdAndEquipmentTypeAndDeletedFalse(
                                                recipe.getUnit().getId(),
                                                EquipmentType.MAIN_EQUIPMENT)
                                .orElseThrow(() -> new BadRequestException(
                                                "Recipe default unit does not have a main equipment."));

                Equipment selectedMainEquipment = equipmentRepository
                                .findByCreatorUnitIdAndEquipmentTypeAndDeletedFalse(
                                                unitId,
                                                EquipmentType.MAIN_EQUIPMENT)
                                .orElseThrow(() -> new BadRequestException(
                                                "Selected unit does not have a main equipment."));

                Set<Equipment> equipments = getRecipeEquipments(recipe);

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

        private static final double QUANTITY_TOLERANCE = 0.01;

        @Override
        @Transactional
        public void transfer(Long id) {
                ControlRecipe controlRecipe = getControlRecipe(id);
                if (controlRecipe.getStatus() == ControlRecipeStatus.TRANSFERRED) {
                        throw new ResourceNotFoundException("Already transferred.");
                }

                Double totalMaterialQty = controlRecipeSOPRepository
                                .getTotalMaterialQtyByControlRecipeId(controlRecipe.getId());
                double batchSize = controlRecipe.getBatchSize();
                if (Math.abs(totalMaterialQty - batchSize) > QUANTITY_TOLERANCE) {
                        throw new BadRequestException(String.format(
                                        "Total material quantity (%.2f kg) must equal control recipe batch size (%d kg).",
                                        totalMaterialQty,
                                        controlRecipe.getBatchSize()));
                }

                Batch batch = batchMapper.toEntity(controlRecipe);
                batchRepository.save(batch);
                controlRecipe.setStatus(ControlRecipeStatus.TRANSFERRED);
                controlRecipeRepository.save(controlRecipe);
        }

        private Set<Equipment> getRecipeEquipments(Recipe recipe) {
                Set<Equipment> equipments = new LinkedHashSet<>();

                recipe.getSops().forEach(step -> {
                        if (step.getFromEquipment() != null) {
                                equipments.add(step.getFromEquipment());
                        }
                        if (step.getToEquipment() != null) {
                                equipments.add(step.getToEquipment());
                        }
                });

                return equipments;
        }

        private ControlRecipe getControlRecipe(Long id) {
                return controlRecipeRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Control Recipe not found."));
        }

        private User getUser(Long id, String message) {
                return userRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException(message));
        }

        private void audit(BatchAuditAction action, ControlRecipeAudit oldData, ControlRecipeAudit newData) {
                batchAuditService.save(
                                BatchAuditRequest.builder()
                                                .entity(EntityType.CONTROL_RECIPE)
                                                .module(ModuleType.SCHEDULER)
                                                .action(action)
                                                .oldData(oldData)
                                                .newData(newData)
                                                .build());
        }
}
