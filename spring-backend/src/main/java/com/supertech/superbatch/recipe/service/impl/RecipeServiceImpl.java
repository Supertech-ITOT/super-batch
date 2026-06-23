package com.supertech.superbatch.recipe.service.impl;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.enums.RecipeStatus;
import com.supertech.superbatch.recipe.mapper.RecipeMapper;
import com.supertech.superbatch.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.service.RecipeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class RecipeServiceImpl implements RecipeService {
    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;

    @Override
    public RecipeResponse create(CreateRecipeRequest request) {

        Recipe recipe = recipeMapper.toEntity(request);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String createdBy = authentication.getName();

        recipe.setCreatedBy(createdBy);

        recipe.setVersion(1);
        recipe.setStatus(RecipeStatus.UNRELEASED);

        recipe = recipeRepository.save(recipe);

        return recipeMapper.toResponse(recipe);
    }

    @Override
    public List<RecipeResponse> getAll() {

        return recipeRepository.findAll()
                .stream()
                .map(recipeMapper::toResponse)
                .toList();
    }

    @Override
    public RecipeResponse getById(Long id) {

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        return recipeMapper.toResponse(recipe);
    }

    @Override
    public RecipeResponse update(
            Long id,
            UpdateRecipeRequest request) {

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        recipe.setName(request.getName());
        recipe.setDescription(request.getDescription());
        recipe.setBatchSize(request.getBatchSize());
        recipe.setBatchSizeUom(request.getBatchSizeUom());

        recipe = recipeRepository.save(recipe);

        return recipeMapper.toResponse(recipe);
    }

    @Override
    public void delete(Long id) {

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        recipeRepository.delete(recipe);
    }
}
