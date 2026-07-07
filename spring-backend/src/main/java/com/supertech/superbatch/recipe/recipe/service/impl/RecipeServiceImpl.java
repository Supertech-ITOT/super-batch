package com.supertech.superbatch.recipe.recipe.service.impl;

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
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.RecipeDependencies;
import com.supertech.superbatch.recipe.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.mapper.RecipeMapper;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe.service.RecipeService;
import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;
import com.supertech.superbatch.recipe.recipe_header.repository.RecipeHeaderRepository;
import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialRequest;
import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialResponse;
import com.supertech.superbatch.recipe.recipe_material.service.RecipeMaterialService;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterResponse;
import com.supertech.superbatch.recipe.recipe_parameter.service.RecipeParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {
        private final RecipeRepository recipeRepository;
        private final RecipeHeaderRepository recipeHeaderRepository;
        private final RecipeMapper recipeMapper;
        private final ActionRepository actionRepository;
        private final EquipmentRepository equipmentRepository;
        private final TransitionRepository transitionRepository;
        private final RecipeParameterService recipeParameterService;
        private final RecipeMaterialService recipeMaterialService;

        @Override
        public RecipeResponse getById(Long id) {
                Recipe recipe = recipeRepository.findWithRelationsById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                List<RecipeMaterialResponse> materials = recipeMaterialService.getAllByRecipe(recipe);
                List<RecipeParameterResponse> parameters = recipeParameterService.getAllByRecipe(recipe);
                return recipeMapper.toResponse(recipe, materials, parameters);
        }

        @Override
        public List<RecipeResponse> getAllByRecipeHeaderId(Long recipeHeaderId) {
                List<Recipe> recipes = recipeRepository.findWithRelationsByRecipeHeaderId(recipeHeaderId);
                return recipes.stream()
                                .sorted(Comparator.comparing(Recipe::getStepNo))
                                .map(
                                                recipe -> recipeMapper.toResponse(recipe,
                                                                recipeMaterialService.getAllByRecipe(recipe),
                                                                recipeParameterService.getAllByRecipe(recipe)))
                                .toList();
        }

        @Override
        public void create(CreateRecipeRequest request) {
                List<Recipe> steps = recipeRepository.findAllByRecipeHeaderId(request.recipeHeaderId());
                Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
                RecipeHeader recipeHeader = recipeHeaderRepository.findById(request.recipeHeaderId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                RecipeDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
                Recipe recipe = recipeMapper.toEntity(
                                request,
                                stepNo,
                                recipeHeader,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeRepository.save(recipe);
                recipeParameterService.create(recipe, request.parameters());
                recipeMaterialService.create(recipe, request.materials());
        }

        @Transactional
        @Override
        public void update(UpdateRecipeRequest request) {
                Recipe recipe = recipeRepository.findById(request.id())
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                RecipeDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
                recipeMapper.updateEntity(
                                request,
                                recipe,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeParameterService.update(recipe, request.parameters());
                recipeMaterialService.update(recipe, request.materials());
                recipeRepository.save(recipe);
        }

        @Transactional
        @Override
        public void delete(Long id) {
                Recipe recipe = recipeRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                recipeParameterService.deleteByRecipe(recipe);
                recipeMaterialService.deleteByRecipe(recipe);
                recipeRepository.decrementStepNumbers(
                                recipe.getRecipeHeader().getId(),
                                recipe.getStepNo());
                recipeRepository.delete(recipe);
        }

        @Transactional
        @Override
        public void moveUp(Long recipeId) {
                Recipe current = recipeRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                if (current.getStepNo() == 1) {
                        throw new BadRequestException("Step 1 cannot be moved up.");
                }
                Recipe previous = recipeRepository.findByRecipeHeaderIdAndStepNo(
                                current.getRecipeHeader().getId(),
                                current.getStepNo() - 1)
                                .orElseThrow(() -> new ResourceNotFoundException("Previous step not found."));
                int temp = current.getStepNo();
                current.setStepNo(previous.getStepNo());
                previous.setStepNo(temp);
                recipeRepository.save(current);
                recipeRepository.save(previous);
        }

        @Transactional
        @Override
        public void moveDown(Long recipeId) {
                Recipe current = recipeRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                Recipe next = recipeRepository.findByRecipeHeaderIdAndStepNo(
                                current.getRecipeHeader().getId(),
                                current.getStepNo() + 1)
                                .orElseThrow(() -> new ResourceNotFoundException("Next step not found."));
                int temp = current.getStepNo();
                current.setStepNo(next.getStepNo());
                next.setStepNo(temp);
                recipeRepository.save(current);
                recipeRepository.save(next);
        }

        @Transactional
        public void insertBelow(Long recipeId, CreateRecipeRequest request) {
                Recipe recipe = recipeRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                RecipeDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
                recipeRepository.incrementStepNumbersAfter(
                                recipe.getRecipeHeader().getId(),
                                recipe.getStepNo());
                Recipe newRecipe = recipeMapper.toEntity(
                                request,
                                recipe.getStepNo() + 1,
                                recipe.getRecipeHeader(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeRepository.save(newRecipe);
        }

        @Transactional
        public void insertAbove(Long recipeId, CreateRecipeRequest request) {
                Recipe recipe = recipeRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                RecipeDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
                recipeRepository.incrementStepNumbersFrom(
                                recipe.getRecipeHeader().getId(),
                                recipe.getStepNo());
                Recipe newRecipe = recipeMapper.toEntity(
                                request,
                                recipe.getStepNo(),
                                recipe.getRecipeHeader(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeRepository.save(newRecipe);
        }

        private RecipeDependencies loadInsertDependencies(
                        Long actionId,
                        Long transitionId,
                        Long fromEquipmentId,
                        Long toEquipmentId,
                        List<RecipeMaterialRequest> materials) {

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

                recipeMaterialService.validate(transition, materials);

                return RecipeDependencies.builder()
                                .action(action)
                                .transition(transition)
                                .fromEquipment(fromEquipment)
                                .toEquipment(toEquipment)
                                .build();
        }
}
