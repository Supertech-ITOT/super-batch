package com.supertech.superbatch.recipe.recipe_sop.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe_sop.dto.CreateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPDependencies;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPMaterialSummaryResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPSummaryResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.UpdateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop.mapper.RecipeSOPMapper;
import com.supertech.superbatch.recipe.recipe_sop.repository.RecipeSOPRepository;
import com.supertech.superbatch.recipe.recipe_sop.service.RecipeSOPService;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;
import com.supertech.superbatch.recipe.recipe_sop_material.repository.RecipeSOPMaterialRepository;
import com.supertech.superbatch.recipe.recipe_sop_material.service.RecipeSOPMaterialService;
import com.supertech.superbatch.recipe.recipe_sop_parameter.service.RecipeSOPParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeSOPServiceImpl implements RecipeSOPService {
        private final RecipeSOPRepository recipeSOPRepository;
        private final RecipeRepository recipeRepository;
        private final RecipeSOPMapper recipeSOPMapper;
        private final ActionRepository actionRepository;
        private final EquipmentRepository equipmentRepository;
        private final TransitionRepository transitionRepository;
        private final RecipeSOPParameterService recipeSOPParameterService;
        private final RecipeSOPMaterialService recipeSOPMaterialService;
        private final RecipeSOPMaterialRepository recipeSOPMaterialRepository;
        private final UomMapper uomMapper;

        @Override
        public RecipeSOPResponse getById(Long id) {
                RecipeSOP recipeSOP = recipeSOPRepository.findWithRelationsById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                return recipeSOPMapper.toResponse(recipeSOP, recipeSOP.getMaterials(), recipeSOP.getParameters());
        }

        @Override
        public List<RecipeSOPResponse> getAllByRecipeId(Long recipeId) {
                List<RecipeSOP> recipeSOPs = recipeSOPRepository.findWithRelationsByRecipeId(recipeId);
                return recipeSOPs.stream()
                                .sorted(Comparator.comparing(RecipeSOP::getStepNo))
                                .map(recipeSOP -> recipeSOPMapper.toResponse(recipeSOP, recipeSOP.getMaterials(),
                                                recipeSOP.getParameters()))
                                .toList();
        }

        @Override
        public void create(CreateRecipeSOPRequest request) {
                List<RecipeSOP> steps = recipeSOPRepository.findAllByRecipeId(request.recipeId());
                Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
                Recipe recipe = recipeRepository.findByIdWithRelations(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials(),
                                recipe, null);
                RecipeSOP recipeSOP = recipeSOPMapper.toEntity(
                                request,
                                stepNo,
                                recipe,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeSOPRepository.save(recipeSOP);
                recipeSOPParameterService.create(recipeSOP, request.parameters());
                recipeSOPMaterialService.create(recipeSOP, request.materials());
        }

        @Transactional
        @Override
        public void update(UpdateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(request.id())
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                Recipe recipe = recipeRepository.findByIdWithRelations(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials(),
                                recipe, recipeSOP.getId());
                recipeSOPMapper.updateEntity(
                                request,
                                recipeSOP,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeSOPParameterService.update(recipeSOP, request.parameters());
                recipeSOPMaterialService.update(recipeSOP, request.materials());
                recipeSOPRepository.save(recipeSOP);
        }

        @Transactional
        @Override
        public void delete(Long id) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                recipeSOPRepository.decrementStepNumbers(
                                recipeSOP.getRecipe().getId(),
                                recipeSOP.getStepNo());
                recipeSOPRepository.delete(recipeSOP);
        }

        @Transactional
        @Override
        public void moveUp(Long recipeId) {
                RecipeSOP current = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                if (current.getStepNo() == 1) {
                        throw new BadRequestException("Step 1 cannot be moved up.");
                }
                RecipeSOP previous = recipeSOPRepository.findByRecipeIdAndStepNo(
                                current.getRecipe().getId(),
                                current.getStepNo() - 1)
                                .orElseThrow(() -> new ResourceNotFoundException("Previous step not found."));
                int temp = current.getStepNo();
                current.setStepNo(previous.getStepNo());
                previous.setStepNo(temp);
                recipeSOPRepository.save(current);
                recipeSOPRepository.save(previous);
        }

        @Transactional
        @Override
        public void moveDown(Long recipeId) {
                RecipeSOP current = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                RecipeSOP next = recipeSOPRepository.findByRecipeIdAndStepNo(
                                current.getRecipe().getId(),
                                current.getStepNo() + 1)
                                .orElseThrow(() -> new ResourceNotFoundException("Next step not found."));
                int temp = current.getStepNo();
                current.setStepNo(next.getStepNo());
                next.setStepNo(temp);
                recipeSOPRepository.save(current);
                recipeSOPRepository.save(next);
        }

        @Transactional
        @Override
        public void insertBelow(Long recipeId, CreateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                Recipe recipe = recipeRepository.findByIdWithRelations(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials(),
                                recipe, null);
                recipeSOPRepository.incrementStepNumbersAfter(
                                recipeSOP.getRecipe().getId(),
                                recipeSOP.getStepNo());
                RecipeSOP newRecipeSOP = recipeSOPMapper.toEntity(
                                request,
                                recipeSOP.getStepNo() + 1,
                                recipeSOP.getRecipe(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeSOPRepository.save(newRecipeSOP);
        }

        @Transactional
        @Override
        public void insertAbove(Long recipeId, CreateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                Recipe recipe = recipeRepository.findByIdWithRelations(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials(),
                                recipe, null);
                recipeSOPRepository.incrementStepNumbersFrom(
                                recipeSOP.getRecipe().getId(),
                                recipeSOP.getStepNo());
                RecipeSOP newRecipeSOP = recipeSOPMapper.toEntity(
                                request,
                                recipeSOP.getStepNo(),
                                recipeSOP.getRecipe(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeSOPRepository.save(newRecipeSOP);
        }

        private RecipeSOPDependencies loadInsertDependencies(
                        Long actionId,
                        Long transitionId,
                        Long fromEquipmentId,
                        Long toEquipmentId,
                        List<RecipeSOPMaterialRequest> materials,
                        Recipe recipe,
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

                validateEquipment(transition, fromEquipment, toEquipment, recipe.getUnit().getId());
                validateMaterial(recipe.getId(), recipeSOPId, transition, materials, recipe.getUnit().getBatchSizeUom(),
                                recipe.getBatchSize());

                return RecipeSOPDependencies.builder()
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
                        List<RecipeSOPMaterialRequest> materials,
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

                double requestedQty = materials.stream().mapToDouble(RecipeSOPMaterialRequest::stdQty).sum();
                double existingQty = recipeSOPMaterialRepository.getTotalMaterialQtyByRecipeId(recipeId);

                if (recipeSOPId != null) {
                        existingQty -= recipeSOPMaterialRepository.getTotalMaterialQtyByRecipeSOPId(recipeSOPId);
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
        public RecipeSOPSummaryResponse getSummaryByRecipeId(Long recipeId) {
                Recipe recipe = recipeRepository.findByIdWithRelations(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));

                Integer batchSize = recipe.getBatchSize();
                UomResponse batchSizeUom = uomMapper.toResponse(recipe.getUnit().getBatchSizeUom());

                List<RecipeSOP> recipeSOPs = recipeSOPRepository.findWithRelationsByRecipeId(recipe.getId());
                int totalSteps = recipeSOPs.size();
                double totalDuration = recipeSOPs.stream()
                                .map(RecipeSOP::getStdTime)
                                .filter(Objects::nonNull)
                                .mapToDouble(Double::doubleValue)
                                .sum();

                List<RecipeSOPMaterial> recipeSOPMaterials = recipeSOPs.stream()
                                .flatMap(recipeSOP -> recipeSOP.getMaterials().stream())
                                .toList();

                Map<Long, RecipeSOPMaterialSummaryResponse> materialMap = recipeSOPMaterials.stream()
                                .collect(Collectors.toMap(
                                                m -> m.getMaterial().getId(),
                                                m -> new RecipeSOPMaterialSummaryResponse(
                                                                m.getMaterial().getId(),
                                                                m.getMaterial().getName(),
                                                                m.getStdQty()),
                                                (existing, current) -> new RecipeSOPMaterialSummaryResponse(
                                                                existing.id(),
                                                                existing.name(),
                                                                existing.stdQty() + current.stdQty())));

                List<RecipeSOPMaterialSummaryResponse> materials = new ArrayList<>(materialMap.values());

                return new RecipeSOPSummaryResponse(batchSize, batchSizeUom, totalSteps, materials.size(),
                                totalDuration, materials);

        }
}
