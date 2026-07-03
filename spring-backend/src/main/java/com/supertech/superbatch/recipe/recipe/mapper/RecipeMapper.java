package com.supertech.superbatch.recipe.recipe.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;

@Component
public class RecipeMapper {
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
