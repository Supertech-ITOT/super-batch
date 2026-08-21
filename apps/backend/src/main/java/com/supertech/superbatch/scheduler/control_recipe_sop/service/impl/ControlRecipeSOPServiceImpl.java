package com.supertech.superbatch.scheduler.control_recipe_sop.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.repository.ControlRecipeRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPAudit;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPDependencies;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPMaterialSummaryResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPSummaryResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.CreateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.UpdateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop.helper.ControlRecipeSOPLookupService;
import com.supertech.superbatch.scheduler.control_recipe_sop.loader.ControlRecipeSOPDependencyLoader;
import com.supertech.superbatch.scheduler.control_recipe_sop.mapper.ControlRecipeSOPMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop.repository.ControlRecipeSOPRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop.service.ControlRecipeSOPService;
import com.supertech.superbatch.scheduler.control_recipe_sop.validation.ControlRecipeSOPValidator;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ControlRecipeSOPServiceImpl implements ControlRecipeSOPService {
        private static final int STEP_OFFSET = 1_000_000;
        private final ControlRecipeSOPRepository controlRecipeSOPRepository;
        private final ControlRecipeRepository controlRecipeRepository;
        private final ControlRecipeSOPMapper controlRecipeSOPMapper;
        private final ControlRecipeSOPDependencyLoader controlRecipeSOPDependencyLoader;
        private final BatchAuditService batchAuditService;
        private final ControlRecipeSOPValidator controlRecipeSOPValidator;
        private final ControlRecipeSOPLookupService controlRecipeSOPLookupService;

        @Override
        public ControlRecipeSOPResponse getById(Long id) {
                ControlRecipeSOP controlRecipeSOP = getControlRecipeSOP(id);
                return controlRecipeSOPMapper.toResponse(controlRecipeSOP, controlRecipeSOP.getMaterials(),
                                controlRecipeSOP.getParameters());
        }

        @Override
        public List<ControlRecipeSOPResponse> getAllByControlRecipeId(Long controlRecipeId) {
                List<ControlRecipeSOP> controlRecipeSOPs = controlRecipeSOPRepository
                                .findWithRelationsByControlRecipeId(controlRecipeId);
                return controlRecipeSOPs.stream()
                                .sorted(Comparator.comparing(ControlRecipeSOP::getStepNo))
                                .map(controlRecipeSOP -> controlRecipeSOPMapper.toResponse(controlRecipeSOP,
                                                controlRecipeSOP.getMaterials(),
                                                controlRecipeSOP.getParameters()))
                                .toList();
        }

        @Override
        @Transactional
        public void create(CreateControlRecipeSOPRequest request) {
                ControlRecipe controlRecipe = getControlRecipe(request.controlRecipeId());
                controlRecipeSOPValidator.validateEditable(controlRecipe);
                List<ControlRecipeSOP> steps = controlRecipeSOPRepository
                                .findAllByControlRecipeId(request.controlRecipeId());
                Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
                ControlRecipeSOPDependencies deps = controlRecipeSOPDependencyLoader.loadInsertDependencies(request,
                                controlRecipe, null);
                ControlRecipeSOP controlRecipeSOP = controlRecipeSOPMapper.toEntity(
                                request,
                                stepNo,
                                controlRecipe,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment(),
                                controlRecipeSOPLookupService.getMaterialMap(request.materials()),
                                controlRecipeSOPLookupService.getParameterMap(request.parameters()));
                controlRecipeSOPRepository.save(controlRecipeSOP);
                audit(BatchAuditAction.CREATED, null, controlRecipeSOPMapper.copy(controlRecipeSOP));
        }

        @Override
        @Transactional
        public void update(UpdateControlRecipeSOPRequest request) {
                ControlRecipeSOP controlRecipeSOP = getControlRecipeSOP(request.id());
                ControlRecipe controlRecipe = getControlRecipe(request.controlRecipeId());
                controlRecipeSOPValidator.validateEditable(controlRecipe);
                ControlRecipeSOPDependencies deps = controlRecipeSOPDependencyLoader.loadInsertDependencies(request,
                                controlRecipe, controlRecipeSOP.getId());
                ControlRecipeSOPAudit oldData = controlRecipeSOPMapper.copy(controlRecipeSOP);
                // Remove existing children and Force orphanRemoval DELETE
                controlRecipeSOP.getMaterials().clear();
                controlRecipeSOP.getParameters().clear();
                controlRecipeSOPRepository.flush();
                controlRecipeSOPMapper.updateEntity(
                                request,
                                controlRecipeSOP,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment(),
                                controlRecipeSOPLookupService.getMaterialMap(request.materials()),
                                controlRecipeSOPLookupService.getParameterMap(request.parameters()));
                controlRecipeSOPRepository.save(controlRecipeSOP);
                audit(BatchAuditAction.UPDATED, oldData, controlRecipeSOPMapper.copy(controlRecipeSOP));
        }

        @Override
        @Transactional
        public void delete(Long id) {
                ControlRecipeSOP controlRecipeSOP = getControlRecipeSOP(id);

                Long controlRecipeId = controlRecipeSOP.getControlRecipe().getId();
                Integer stepNo = controlRecipeSOP.getStepNo();

                controlRecipeSOPValidator.validateEditable(controlRecipeSOP.getControlRecipe());
                audit(BatchAuditAction.DELETED, controlRecipeSOPMapper.copy(controlRecipeSOP), null);

                // Move all following steps out of the way
                controlRecipeSOPRepository.shiftStepNumbersAfter(controlRecipeId, stepNo, STEP_OFFSET);
                controlRecipeSOPRepository.flush();

                // Delete the selected step
                controlRecipeSOPRepository.delete(controlRecipeSOP);
                controlRecipeSOPRepository.flush();

                // Move following steps back and decrement them by 1
                controlRecipeSOPRepository.shiftStepNumbersAfter(controlRecipeId, stepNo + STEP_OFFSET,
                                -STEP_OFFSET - 1);
                controlRecipeSOPRepository.flush();
        }

        @Override
        @Transactional
        public void moveUp(Long controlRecipeSOPId) {
                move(controlRecipeSOPId, -1);
        }

        @Override
        @Transactional
        public void moveDown(Long controlRecipeSOPId) {
                move(controlRecipeSOPId, 1);
        }

        @Override
        @Transactional
        public void insertAbove(Long controlRecipeSOPId,
                        CreateControlRecipeSOPRequest request) {
                insert(controlRecipeSOPId, request, true);
        }

        @Override
        @Transactional
        public void insertBelow(Long controlRecipeSOPId,
                        CreateControlRecipeSOPRequest request) {
                insert(controlRecipeSOPId, request, false);
        }

        @Override
        public ControlRecipeSOPSummaryResponse getSummaryByControlRecipeId(Long controlRecipeId) {
                ControlRecipe controlRecipe = getControlRecipe(controlRecipeId);
                Integer batchSize = controlRecipe.getBatchSize();
                List<ControlRecipeSOP> controlRecipeSOPs = controlRecipeSOPRepository
                                .findWithRelationsByControlRecipeId(controlRecipe.getId());
                int totalSteps = controlRecipeSOPs.size();
                double totalDuration = controlRecipeSOPs.stream()
                                .map(ControlRecipeSOP::getStdTime)
                                .filter(Objects::nonNull)
                                .mapToDouble(Double::doubleValue)
                                .sum();

                List<ControlRecipeSOPMaterial> controlRecipeSOPMaterials = controlRecipeSOPs.stream()
                                .flatMap(controlRecipeSOP -> controlRecipeSOP.getMaterials().stream())
                                .toList();

                Map<Long, ControlRecipeSOPMaterialSummaryResponse> materialMap = controlRecipeSOPMaterials.stream()
                                .collect(Collectors.toMap(
                                                m -> m.getMaterial().getId(),
                                                m -> new ControlRecipeSOPMaterialSummaryResponse(
                                                                m.getMaterial().getId(),
                                                                m.getMaterial().getName(),
                                                                m.getStdQty()),
                                                (existing, current) -> new ControlRecipeSOPMaterialSummaryResponse(
                                                                existing.id(),
                                                                existing.name(),
                                                                existing.stdQty() + current.stdQty())));

                List<ControlRecipeSOPMaterialSummaryResponse> materials = new ArrayList<>(materialMap.values());
                return new ControlRecipeSOPSummaryResponse(batchSize, totalSteps, materials.size(), totalDuration,
                                materials);
        }

        private void move(Long controlRecipeSOPId, int direction) {
                ControlRecipeSOP current = getControlRecipeSOP(controlRecipeSOPId);
                controlRecipeSOPValidator.validateEditable(current.getControlRecipe());
                if (direction < 0 && current.getStepNo() == 1) {
                        throw new BadRequestException("Step 1 cannot be moved up.");
                }

                ControlRecipeSOP other = controlRecipeSOPRepository.findByControlRecipeIdAndStepNo(
                                current.getControlRecipe().getId(),
                                current.getStepNo() + direction)
                                .orElseThrow(() -> new ResourceNotFoundException("Adjacent step not found."));

                int currentStep = current.getStepNo();
                int otherStep = other.getStepNo();

                // 1. Temporarily remove both records from their unique keys
                current.setStepNo(-currentStep);
                other.setStepNo(-otherStep);

                controlRecipeSOPRepository.flush();

                // 2. Assign the swapped step numbers
                current.setStepNo(otherStep);
                other.setStepNo(currentStep);

                controlRecipeSOPRepository.flush();
        }

        private void insert(Long controlRecipeSOPId, CreateControlRecipeSOPRequest request, boolean above) {
                ControlRecipeSOP current = getControlRecipeSOP(controlRecipeSOPId);
                ControlRecipe controlRecipe = getControlRecipe(request.controlRecipeId());
                controlRecipeSOPValidator.validateEditable(controlRecipe);

                ControlRecipeSOPDependencies deps = controlRecipeSOPDependencyLoader.loadInsertDependencies(request,
                                controlRecipe, null);

                Long controlRecipeId = current.getControlRecipe().getId();
                int currentStep = current.getStepNo();
                int newStepNo = above ? currentStep : currentStep + 1;

                // Move affected steps out of the way
                controlRecipeSOPRepository.shiftStepNumbersFrom(controlRecipeId, newStepNo, STEP_OFFSET);
                controlRecipeSOPRepository.flush();

                // Bring them back with +1
                controlRecipeSOPRepository.shiftStepNumbersFrom(controlRecipeId, newStepNo + STEP_OFFSET,
                                1 - STEP_OFFSET);
                controlRecipeSOPRepository.flush();

                ControlRecipeSOP newStep = controlRecipeSOPMapper.toEntity(
                                request,
                                newStepNo,
                                current.getControlRecipe(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment(),
                                controlRecipeSOPLookupService.getMaterialMap(request.materials()),
                                controlRecipeSOPLookupService.getParameterMap(request.parameters()));

                controlRecipeSOPRepository.save(newStep);
                audit(BatchAuditAction.CREATED, null, controlRecipeSOPMapper.copy(newStep));
        }

        private void audit(BatchAuditAction action, ControlRecipeSOPAudit oldData, ControlRecipeSOPAudit newData) {
                batchAuditService.save(
                                BatchAuditRequest.builder()
                                                .entity(EntityType.CONTROL_RECIPE_SOP)
                                                .module(ModuleType.SCHEDULER)
                                                .action(action)
                                                .oldData(oldData)
                                                .newData(newData)
                                                .build());
        }

        private ControlRecipeSOP getControlRecipeSOP(Long id) {
                return controlRecipeSOPRepository.findWithRelationsById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
        }

        private ControlRecipe getControlRecipe(Long id) {
                return controlRecipeRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Control recipe not found."));
        }

}
