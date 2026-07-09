package com.supertech.superbatch.recipe.recipe_sop.service.impl;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe_sop.dto.CreateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPDependencies;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.UpdateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop.mapper.RecipeSOPMapper;
import com.supertech.superbatch.recipe.recipe_sop.repository.RecipeSOPRepository;
import com.supertech.superbatch.recipe.recipe_sop.service.RecipeSOPService;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialResponse;
import com.supertech.superbatch.recipe.recipe_sop_material.service.RecipeSOPMaterialService;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterResponse;
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

        @Override
        public RecipeSOPResponse getById(Long id) {
                RecipeSOP recipeSOP = recipeSOPRepository.findWithRelationsById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                List<RecipeSOPMaterialResponse> materials = recipeSOPMaterialService.getAllByRecipe(recipeSOP);
                List<RecipeSOPParameterResponse> parameters = recipeSOPParameterService.getAllByRecipe(recipeSOP);
                return recipeSOPMapper.toResponse(recipeSOP, materials, parameters);
        }

        @Override
        public List<RecipeSOPResponse> getAllByRecipeId(Long recipeId) {
                List<RecipeSOP> recipeSOPs = recipeSOPRepository.findWithRelationsByRecipeId(recipeId);
                return recipeSOPs.stream()
                                .sorted(Comparator.comparing(RecipeSOP::getStepNo))
                                .map(
                                                recipeSOP -> recipeSOPMapper.toResponse(recipeSOP,
                                                                recipeSOPMaterialService.getAllByRecipe(recipeSOP),
                                                                recipeSOPParameterService.getAllByRecipe(recipeSOP)))
                                .toList();
        }

        @Override
        public void create(CreateRecipeSOPRequest request) {
                List<RecipeSOP> steps = recipeSOPRepository.findAllByRecipeId(request.recipeId());
                Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
                Recipe recipe = recipeRepository.findById(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
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
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
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
                recipeSOPParameterService.deleteByRecipeSOP(recipeSOP);
                recipeSOPMaterialService.deleteByRecipeSOP(recipeSOP);
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
        public void insertBelow(Long recipeId, CreateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
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
        public void insertAbove(Long recipeId, CreateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
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
                        List<RecipeSOPMaterialRequest> materials) {

                Action action = actionRepository.findById(actionId)
                                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));

                Transition transition = transitionRepository.findById(transitionId)
                                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));

                if (fromEquipmentId != null && fromEquipmentId.equals(toEquipmentId)) {
                        throw new BadRequestException("From Equipment and To Equipment cannot be same.");
                }

                Equipment fromEquipment = null;

                if (fromEquipmentId != null) {
                        fromEquipment = equipmentRepository.findById(fromEquipmentId)
                                        .orElseThrow(() -> new ResourceNotFoundException("From Equipment not found."));
                }

                Equipment toEquipment = equipmentRepository.findById(toEquipmentId)
                                .orElseThrow(() -> new ResourceNotFoundException("To Equipment not found."));

                recipeSOPMaterialService.validate(transition, materials);

                return RecipeSOPDependencies.builder()
                                .action(action)
                                .transition(transition)
                                .fromEquipment(fromEquipment)
                                .toEquipment(toEquipment)
                                .build();
        }
}
