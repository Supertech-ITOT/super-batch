package com.supertech.superbatch.scheduler.control_recipe_sop.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.common.dto.UomResponse;
import com.supertech.superbatch.plant.common.mapper.UomMapper;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.enums.TransitionType;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.repository.ControlRecipeRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPDependencies;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPMaterialSummaryResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPSummaryResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.CreateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.UpdateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop.mapper.ControlRecipeSOPMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop.repository.ControlRecipeSOPRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop.service.ControlRecipeSOPService;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.repository.ControlRecipeSOPMaterialRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.service.ControlRecipeSOPMaterialService;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.service.ControlRecipeSOPParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ControlRecipeSOPServiceImpl implements ControlRecipeSOPService {
        private final ControlRecipeSOPRepository controlRecipeSOPRepository;
        private final ControlRecipeRepository controlRecipeRepository;
        private final ControlRecipeSOPMapper controlRecipeSOPMapper;
        private final ActionRepository actionRepository;
        private final EquipmentRepository equipmentRepository;
        private final TransitionRepository transitionRepository;
        private final ControlRecipeSOPParameterService controlRecipeSOPParameterService;
        private final ControlRecipeSOPMaterialService controlRecipeSOPMaterialService;
        private final ControlRecipeSOPMaterialRepository controlRecipeSOPMaterialRepository;
        private final UomMapper uomMapper;

        @Override
        public ControlRecipeSOPResponse getById(Long id) {
                ControlRecipeSOP controlRecipeSOP = controlRecipeSOPRepository.findWithRelationsById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
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
        public void create(CreateControlRecipeSOPRequest request) {
                List<ControlRecipeSOP> steps = controlRecipeSOPRepository
                                .findAllByControlRecipeId(request.controlRecipeId());
                Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
                ControlRecipe controlRecipe = controlRecipeRepository.findByIdWithRelations(request.controlRecipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Control Recipe not found."));
                ControlRecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials(),
                                controlRecipe, null);
                ControlRecipeSOP controlRecipeSOP = controlRecipeSOPMapper.toEntity(
                                request,
                                stepNo,
                                controlRecipe,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                controlRecipeSOPRepository.save(controlRecipeSOP);
                controlRecipeSOPParameterService.create(controlRecipeSOP, request.parameters());
                controlRecipeSOPMaterialService.create(controlRecipeSOP, request.materials());
        }

        @Override
        public void update(UpdateControlRecipeSOPRequest request) {
                ControlRecipeSOP controlRecipeSOP = controlRecipeSOPRepository.findById(request.id())
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                ControlRecipe controlRecipe = controlRecipeRepository.findByIdWithRelations(request.controlRecipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                ControlRecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials(),
                                controlRecipe, controlRecipeSOP.getId());
                controlRecipeSOPMapper.updateEntity(
                                request,
                                controlRecipeSOP,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                controlRecipeSOPParameterService.update(controlRecipeSOP, request.parameters());
                controlRecipeSOPMaterialService.update(controlRecipeSOP, request.materials());
                controlRecipeSOPRepository.save(controlRecipeSOP);
        }

        @Override
        public void delete(Long id) {
                ControlRecipeSOP controlRecipeSOP = controlRecipeSOPRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                controlRecipeSOPRepository.decrementStepNumbers(
                                controlRecipeSOP.getControlRecipe().getId(),
                                controlRecipeSOP.getStepNo());
                controlRecipeSOPRepository.delete(controlRecipeSOP);
        }

        @Override
        public void moveUp(Long controlRecipeId) {
                ControlRecipeSOP current = controlRecipeSOPRepository.findById(controlRecipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                if (current.getStepNo() == 1) {
                        throw new BadRequestException("Step 1 cannot be moved up.");
                }
                ControlRecipeSOP previous = controlRecipeSOPRepository.findByControlRecipeIdAndStepNo(
                                current.getControlRecipe().getId(),
                                current.getStepNo() - 1)
                                .orElseThrow(() -> new ResourceNotFoundException("Previous step not found."));
                int temp = current.getStepNo();
                current.setStepNo(previous.getStepNo());
                previous.setStepNo(temp);
                controlRecipeSOPRepository.save(current);
                controlRecipeSOPRepository.save(previous);
        }

        @Override
        public void moveDown(Long controlRecipeId) {
                ControlRecipeSOP current = controlRecipeSOPRepository.findById(controlRecipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                ControlRecipeSOP next = controlRecipeSOPRepository.findByControlRecipeIdAndStepNo(
                                current.getControlRecipe().getId(),
                                current.getStepNo() + 1)
                                .orElseThrow(() -> new ResourceNotFoundException("Next step not found."));
                int temp = current.getStepNo();
                current.setStepNo(next.getStepNo());
                next.setStepNo(temp);
                controlRecipeSOPRepository.save(current);
                controlRecipeSOPRepository.save(next);
        }

        @Override
        public void insertAbove(Long controlRecipeId, CreateControlRecipeSOPRequest request) {
                ControlRecipeSOP controlRecipeSOP = controlRecipeSOPRepository.findById(controlRecipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                ControlRecipe controlRecipe = controlRecipeRepository.findByIdWithRelations(request.controlRecipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                ControlRecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials(),
                                controlRecipe, null);
                controlRecipeSOPRepository.incrementStepNumbersFrom(
                                controlRecipeSOP.getControlRecipe().getId(),
                                controlRecipeSOP.getStepNo());
                ControlRecipeSOP newControlRecipeSOP = controlRecipeSOPMapper.toEntity(
                                request,
                                controlRecipeSOP.getStepNo(),
                                controlRecipeSOP.getControlRecipe(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                controlRecipeSOPRepository.save(newControlRecipeSOP);
        }

        @Override
        public void insertBelow(Long controlRecipeId, CreateControlRecipeSOPRequest request) {
                ControlRecipeSOP controlRecipeSOP = controlRecipeSOPRepository.findById(controlRecipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                ControlRecipe controlRecipe = controlRecipeRepository.findByIdWithRelations(request.controlRecipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                ControlRecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials(),
                                controlRecipe, null);
                controlRecipeSOPRepository.incrementStepNumbersAfter(
                                controlRecipeSOP.getControlRecipe().getId(),
                                controlRecipeSOP.getStepNo());
                ControlRecipeSOP newControlRecipeSOP = controlRecipeSOPMapper.toEntity(
                                request,
                                controlRecipeSOP.getStepNo() + 1,
                                controlRecipeSOP.getControlRecipe(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                controlRecipeSOPRepository.save(newControlRecipeSOP);
        }

        private ControlRecipeSOPDependencies loadInsertDependencies(
                        Long actionId,
                        Long transitionId,
                        Long fromEquipmentId,
                        Long toEquipmentId,
                        List<ControlRecipeSOPMaterialRequest> materials,
                        ControlRecipe controlRecipe,
                        Long recipeSOPId) {

                Action action = actionRepository.findById(actionId)
                                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));

                Transition transition = transitionRepository.findById(transitionId)
                                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));

                Equipment fromEquipment = null;

                if (fromEquipmentId != null) {
                        fromEquipment = equipmentRepository.findById(fromEquipmentId)
                                        .orElseThrow(() -> new ResourceNotFoundException("From Equipment not found."));
                }

                Equipment toEquipment = equipmentRepository.findById(toEquipmentId)
                                .orElseThrow(() -> new ResourceNotFoundException("To Equipment not found."));

                validateEquipment(transition, fromEquipment, toEquipment, controlRecipe.getRecipe().getUnit().getId());
                validateMaterial(controlRecipe.getId(), recipeSOPId, transition, materials,
                                controlRecipe.getRecipe().getUnit().getBatchSizeUom(),
                                controlRecipe.getBatchSize());

                return ControlRecipeSOPDependencies.builder()
                                .action(action)
                                .transition(transition)
                                .fromEquipment(fromEquipment)
                                .toEquipment(toEquipment)
                                .build();
        }

        private void validateEquipment(Transition transition, Equipment fromEquipment, Equipment toEquipment,
                        Long unitId) {
                if (fromEquipment != null) {
                        if (fromEquipment.getId().equals(toEquipment.getId())) {
                                throw new BadRequestException("From Equipment and To Equipment cannot be same.");
                        }

                }
                if (fromEquipment == null
                                && transition.getName().equals(TransitionType.AUTO_MATERIAL_CHARGE.getDisplayName())) {
                        throw new BadRequestException("From Equipment is required in Auto Material Charge transition.");
                }
                if (!transition.getName().equals(TransitionType.TRANSFER.getDisplayName())
                                && (toEquipment.getCreatorUnit() == null
                                                || toEquipment.getCreatorUnit().getId() != unitId)) {
                        throw new BadRequestException(
                                        "To Equipment must be recipe main equipment in selected transition.");
                }
                if (transition.getName().equals(TransitionType.TRANSFER.getDisplayName())
                                && (fromEquipment == null || fromEquipment.getCreatorUnit() == null
                                                || fromEquipment.getCreatorUnit().getId() != unitId)) {
                        throw new BadRequestException(
                                        "From Equipment must be recipe main equipment in Transfer transition.");
                }

        }

        private void validateMaterial(Long recipeId, Long recipeSOPId, Transition transition,
                        List<ControlRecipeSOPMaterialRequest> materials,
                        UomType batchSizeUom, Integer batchSize) {

                materials = materials == null ? List.of() : materials;

                if (TransitionType.AUTO_MATERIAL_CHARGE.getDisplayName().equals(transition.getName())
                                && materials.size() != 1) {
                        throw new BadRequestException("Auto material charging step must contain exactly one material.");
                }

                if (TransitionType.MANUAL_MATERIAL_CHARGE.getDisplayName().equals(transition.getName())
                                && materials.isEmpty()) {
                        throw new BadRequestException(
                                        "Manual material charging step must contain at least one material.");
                }

                double requestedQty = materials.stream().mapToDouble(ControlRecipeSOPMaterialRequest::stdQty).sum();
                double existingQty = controlRecipeSOPMaterialRepository.getTotalMaterialQtyByControlRecipeId(recipeId);

                if (recipeSOPId != null) {
                        existingQty -= controlRecipeSOPMaterialRepository
                                        .getTotalMaterialQtyByControlRecipeSOPId(recipeSOPId);
                }

                double finalQty = existingQty + requestedQty;

                if (batchSizeUom == UomType.KG) {
                        if (finalQty > batchSize) {
                                throw new BadRequestException(String.format(
                                                "Total material quantity (%.2f kg) exceeds recipe batch size (%d kg).",
                                                finalQty, batchSize));
                        }
                }
                if (batchSizeUom == UomType.PERCENT) {
                        if (finalQty > 100) {
                                throw new BadRequestException(String.format(
                                                "Total material percentage (%.2f%%) cannot exceed 100%%.", finalQty));
                        }
                }
        }

        @Override
        public ControlRecipeSOPSummaryResponse getSummaryByControlRecipeId(Long controlRecipeId) {
                ControlRecipe controlRecipe = controlRecipeRepository.findByIdWithRelations(controlRecipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));

                Integer batchSize = controlRecipe.getBatchSize();
                UomResponse batchSizeUom = uomMapper.toResponse(controlRecipe.getRecipe().getUnit().getBatchSizeUom());

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

                return new ControlRecipeSOPSummaryResponse(batchSize, batchSizeUom, totalSteps, materials.size(),
                                totalDuration, materials);
        }

}
