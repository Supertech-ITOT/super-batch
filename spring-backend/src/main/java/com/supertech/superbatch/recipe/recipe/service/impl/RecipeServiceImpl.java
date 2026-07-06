package com.supertech.superbatch.recipe.recipe.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.enums.TransitionType;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.mapper.RecipeMapper;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe.service.RecipeService;
import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;
import com.supertech.superbatch.recipe.recipe_header.repository.RecipeHeaderRepository;
import com.supertech.superbatch.recipe.recipe_material.service.RecipeMaterialService;
import com.supertech.superbatch.recipe.recipe_parameter.service.RecipeParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {
    private final RecipeRepository recipeRepository;
    private final RecipeHeaderRepository recipeHeaderRepository;
    private final RecipeMapper recipeMapper;
    private final ActionRepository actionRepository;
    private final TransitionRepository transitionRepository;
    private final RecipeParameterService recipeParameterService;
    private final RecipeMaterialService recipeMaterialService;

    @Override
    public void create(CreateRecipeRequest request) {
        List<Recipe> steps = recipeRepository.findAllByRecipeHeaderId(request.recipeHeaderId());
        Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
        RecipeHeader recipeHeader = recipeHeaderRepository.findById(request.recipeHeaderId())
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
        Action action = actionRepository.findById(request.actionId())
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        Transition transition = transitionRepository.findById(request.transitionId())
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));

        if (transition.getName().equals(TransitionType.AUTO_MATERIAL_CHARGE.getDisplayName())
                && request.materials().size() != 1) {
            throw new BadRequestException("Material must be one in auto material charging step.");
        }
        if (transition.getName().equals(TransitionType.MANUAL_MATERIAL_CHARGE.getDisplayName())
                && request.materials().size() == 0) {
            throw new BadRequestException("Material must be added in manual material charging step.");
        }
        recipeMaterialService.validate(transition, request.materials());
        Recipe recipe = recipeMapper.toEntity(request, stepNo, recipeHeader, action, transition);
        recipeParameterService.create(recipe, request.parameters());
        recipeMaterialService.create(recipe, request.materials());
        recipeRepository.save(recipe);
    }

    @Transactional
    @Override
    public void update(UpdateRecipeRequest request) {
        Recipe recipe = recipeRepository.findById(request.id())
                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
        Action action = actionRepository.findById(request.actionId())
                .orElseThrow(() -> new ResourceNotFoundException("Action not found"));
        Transition transition = transitionRepository.findById(request.transitionId())
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found"));
        recipeMaterialService.validate(transition, request.materials());
        recipeMapper.updateEntity(request, recipe, action, transition);

        recipeParameterService.update(recipe, request.parameters());
        recipeMaterialService.update(recipe, request.materials());
        recipeRepository.save(recipe);
    }

    @Override
    public void delete(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
        recipeParameterService.deleteByRecipe(recipe);
        recipeMaterialService.deleteByRecipe(recipe);
        recipeRepository.delete(recipe);
        recipeRepository.decrementStepNumbers(
                recipe.getRecipeHeader().getId(),
                recipe.getStepNo());
    }

    @Transactional
    @Override
    public void moveUp(Long recipeId) {

        Recipe current = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));

        if (current.getStepNo() == 1) {
            return; // already first
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
        Recipe current = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
        Action action = actionRepository.findById(request.actionId())
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        Transition transition = transitionRepository.findById(request.transitionId())
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));

        recipeRepository.incrementStepNumbersAfter(
                current.getRecipeHeader().getId(),
                current.getStepNo());

        Recipe recipe = recipeMapper.toEntity(
                request,
                current.getStepNo() + 1,
                current.getRecipeHeader(),
                action,
                transition);

        recipeRepository.save(recipe);
    }

    @Transactional
    public void insertAbove(Long recipeId, CreateRecipeRequest request) {

        Recipe current = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
        Action action = actionRepository.findById(request.actionId())
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        Transition transition = transitionRepository.findById(request.transitionId())
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));

        recipeRepository.incrementStepNumbersFrom(
                current.getRecipeHeader().getId(),
                current.getStepNo());

        Recipe recipe = recipeMapper.toEntity(
                request,
                current.getStepNo(),
                current.getRecipeHeader(),
                action,
                transition);

        recipeRepository.save(recipe);
    }
}
