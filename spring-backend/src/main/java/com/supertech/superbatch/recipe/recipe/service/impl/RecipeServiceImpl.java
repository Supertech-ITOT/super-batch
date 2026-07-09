package com.supertech.superbatch.recipe.recipe.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.Users;
import com.supertech.superbatch.manager.user.repository.UsersRepository;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.mapper.RecipeMapper;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe.service.RecipeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class RecipeServiceImpl implements RecipeService {
        private final RecipeRepository recipeRepository;
        private final MaterialRepository materialRepository;
        private final UnitRepository unitRepository;
        private final RecipeMapper recipeMapper;
        private final UsersRepository usersRepository;

        @Override
        public void delete(Long id) {
                Recipe recipe = recipeRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Recipe header not found."));
                recipeRepository.delete(recipe);
        }

        @Override
        public void create(CreateRecipeRequest request, Long userId) {
                if (recipeRepository.existsByNameIgnoreCase(request.name())) {
                        throw new DuplicateResourceException("Recipe already exists.");
                }
                Material material = materialRepository.findById(request.materialId())
                                .orElseThrow(() -> new ResourceNotFoundException("Product not found."));

                Unit unit = unitRepository.findByIdWithHierarchy(request.unitId())
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
                Users users = usersRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                Recipe recipe = recipeMapper.toEntity(request, material, users, unit);
                recipeRepository.save(recipe);
        }

        @Override
        public List<RecipeResponse> getAll() {
                return recipeRepository.findAllWithRelations().stream().map(recipeMapper::toResponse)
                                .toList();
        }

        @Override
        public RecipeResponse getById(Long id) {
                Recipe recipe = recipeRepository.findByIdWithRelations(id)
                                .orElseThrow(() -> new RuntimeException("Recipe header not found."));
                return recipeMapper.toResponse(recipe);
        }

        @Override
        public void update(Long id, UpdateRecipeRequest request) {
                Material material = materialRepository.findById(request.materialId())
                                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
                Unit unit = unitRepository.findByIdWithHierarchy(request.unitId())
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
                Recipe recipe = recipeRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Recipe header not found."));
                if (recipeRepository.existsByNameIgnoreCase(request.name()) &&
                                !recipe.getName().equalsIgnoreCase(request.name())) {
                        throw new DuplicateResourceException("Recipe already exists.");
                }
                recipeMapper.updateEntity(recipe, request, material, unit);
                recipeRepository.save(recipe);
        }
}
