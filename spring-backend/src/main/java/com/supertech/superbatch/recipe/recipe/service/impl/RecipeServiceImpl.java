package com.supertech.superbatch.recipe.recipe.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.mapper.RecipeMapper;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe.service.RecipeService;
import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;
import com.supertech.superbatch.recipe.recipe_header.repository.RecipeHeaderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {
    private final RecipeRepository recipeRepository;
    private final RecipeHeaderRepository recipeHeaderRepository;
    private final RecipeMapper recipeMapper;

    @Override
    public void create(CreateRecipeRequest request) {
        List<Recipe> steps = recipeRepository.findAllByRecipeHeaderId(request.recipeHeaderId());
        Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
        RecipeHeader recipeHeader = recipeHeaderRepository.findById(request.recipeHeaderId())
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
        Recipe recipe = recipeMapper.toEntity(request, stepNo, recipeHeader, null, null);
        recipeRepository.save(recipe);
    }

    @Override
    public void update(UpdateRecipeRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
        recipeRepository.delete(recipe);
    }

}
