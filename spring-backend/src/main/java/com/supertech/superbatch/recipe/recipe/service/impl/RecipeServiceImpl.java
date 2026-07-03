package com.supertech.superbatch.recipe.recipe.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

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

    @Override
    public void update(UpdateRecipeRequest request) {

        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
        recipeRepository.delete(recipe);
    }

}
