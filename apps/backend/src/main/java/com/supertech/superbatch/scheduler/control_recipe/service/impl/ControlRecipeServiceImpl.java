package com.supertech.superbatch.scheduler.control_recipe.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.CreateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.UpdateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.mapper.ControlRecipeMapper;
import com.supertech.superbatch.scheduler.control_recipe.repository.ControlRecipeRepository;
import com.supertech.superbatch.scheduler.control_recipe.service.ControlRecipeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class ControlRecipeServiceImpl implements ControlRecipeService {
        private final ControlRecipeRepository controlRecipeRepository;
        private final RecipeRepository recipeRepository;
        private final ControlRecipeMapper controlRecipeMapper;
        private final UserRepository userRepository;

        @Override
        public void delete(Long id) {
                ControlRecipe controlRecipe = controlRecipeRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Control Recipe not found."));
                controlRecipeRepository.delete(controlRecipe);
        }

        @Override
        public void create(CreateControlRecipeRequest request, Long userId) {
                List<ControlRecipe> controlRecipes = controlRecipeRepository.findByRecipeId(request.recipeId());
                Integer count = controlRecipes.isEmpty() ? 1 : controlRecipes.size() + 1;

                Recipe recipe = recipeRepository.findById(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                User createdBy = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                User shiftIncharge = userRepository.findById(request.shiftInchargeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Shift Incharge User not found."));

                String controlRecipeName = "CR_" + recipe.getName() + "_" + count;

                ControlRecipe controlRecipe = controlRecipeMapper.toEntity(request, controlRecipeName, recipe,
                                createdBy,
                                shiftIncharge);
                controlRecipeRepository.save(controlRecipe);
        }

        @Override
        public List<ControlRecipeResponse> getAll() {
                List<ControlRecipe> controlRecipes = controlRecipeRepository.findAllWithRelations();
                List<ControlRecipeResponse> controlRecipeResponses = controlRecipes.stream()
                                .map(controlRecipeMapper::toResponse).toList();
                return controlRecipeResponses;
        }

        @Override
        public ControlRecipeResponse getById(Long id) {
                ControlRecipe controlRecipe = controlRecipeRepository.findByIdWithRelations(id)
                                .orElseThrow(() -> new RuntimeException(" Control Recipe not found."));
                return controlRecipeMapper.toResponse(controlRecipe);
        }

        @Override
        public void update(Long id, UpdateControlRecipeRequest request) {
                ControlRecipe controlRecipe = controlRecipeRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Control Recipe not found."));

                User shiftIncharge = userRepository.findById(request.shiftInchargeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Shift Incharge User not found."));

                controlRecipeMapper.updateEntity(controlRecipe, request, shiftIncharge);
                controlRecipeRepository.save(controlRecipe);
        }
}
