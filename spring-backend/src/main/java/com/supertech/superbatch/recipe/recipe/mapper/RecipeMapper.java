package com.supertech.superbatch.recipe.recipe.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;
import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialResponse;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RecipeMapper {

    public RecipeResponse toResponse(Recipe recipe, List<RecipeMaterialResponse> materials,
            List<RecipeParameterResponse> parameters) {
        return RecipeResponse.builder()
                .id(recipe.getId())
                .recipeHeaderId(recipe.getRecipeHeader().getId())
                .stepNo(recipe.getStepNo())
                .stdTime(recipe.getStdTime())
                .message(recipe.getMessage())
                .transitionId(recipe.getTransition().getId())
                .transitionName(recipe.getTransition().getName())
                .actionId(recipe.getAction().getId())
                .actionName(recipe.getAction().getName())
                .materials(materials)
                .parameters(parameters)
                .build();
    }

    public Recipe toEntity(CreateRecipeRequest request, Integer stepNo, RecipeHeader recipeHeader, Action action,
            Transition transition) {
        return Recipe.builder()
                .recipeHeader(recipeHeader)
                .stepNo(stepNo)
                .message(request.message())
                .stdTime(request.stdTime())
                .action(action)
                .transition(transition)
                .build();
    }

    public void updateEntity(UpdateRecipeRequest request, Recipe recipe, Action action, Transition transition) {
        recipe.setAction(action);
        recipe.setTransition(transition);
        recipe.setMessage(request.message());
        recipe.setStdTime(request.stdTime());
    }

}
