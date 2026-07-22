package com.supertech.superbatch.scheduler.control_recipe.service.impl;

import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop.repository.RecipeSOPRepository;
import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.CreateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.UpdateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.mapper.ControlRecipeMapper;
import com.supertech.superbatch.scheduler.control_recipe.repository.ControlRecipeRepository;
import com.supertech.superbatch.scheduler.control_recipe.service.ControlRecipeService;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop.mapper.ControlRecipeSOPMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop.repository.ControlRecipeSOPRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.mapper.ControlRecipeSOPMaterialMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.repository.ControlRecipeSOPMaterialRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.mapper.ControlRecipeSOPParameterMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.repository.ControlRecipeSOPParameterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class ControlRecipeServiceImpl implements ControlRecipeService {
        private final UserRepository userRepository;
        private final ControlRecipeRepository controlRecipeRepository;
        private final ControlRecipeMapper controlRecipeMapper;
        private final ControlRecipeSOPRepository controlRecipeSOPRepository;
        private final ControlRecipeSOPMapper controlRecipeSOPMapper;
        private final ControlRecipeSOPMaterialRepository controlRecipeSOPMaterialRepository;
        private final ControlRecipeSOPMaterialMapper controlRecipeSOPMaterialMapper;
        private final ControlRecipeSOPParameterRepository controlRecipeSOPParameterRepository;
        private final ControlRecipeSOPParameterMapper controlRecipeSOPParameterMapper;
        private final RecipeRepository recipeRepository;
        private final RecipeSOPRepository recipeSOPRepository;

        @Override
        public void delete(Long id) {
                ControlRecipe controlRecipe = controlRecipeRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Control Recipe not found."));
                controlRecipeRepository.delete(controlRecipe);
        }

        @Override
        public void create(CreateControlRecipeRequest request, Long userId) {
                if (controlRecipeRepository.existsByBatchNoIgnoreCase(request.batchNo())) {
                        throw new DuplicateResourceException("Batch No already exists.");
                }
                List<ControlRecipe> controlRecipes = controlRecipeRepository.findByRecipeId(request.recipeId());
                Integer count = controlRecipes.isEmpty() ? 1 : controlRecipes.size() + 1;

                Recipe recipe = recipeRepository.findById(request.recipeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                User createdBy = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                User shiftIncharge = userRepository.findById(request.shiftInchargeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Shift Incharge User not found."));

                String controlRecipeName = "CR_" + recipe.getName() + "_" + count;

                ControlRecipe controlRecipe = null;
                controlRecipe = controlRecipeMapper.toEntity(request, controlRecipeName, recipe, createdBy,
                                shiftIncharge);
                controlRecipe = controlRecipeRepository.save(controlRecipe);
                createControlRecipeSnapshot(controlRecipe, recipe);
        }

        @Override
        public List<ControlRecipeResponse> getAll() {
                List<ControlRecipe> controlRecipes = controlRecipeRepository.findAllWithRelations();
                List<ControlRecipeResponse> controlRecipeResponses = controlRecipes.stream()
                                .sorted(Comparator.comparing(ControlRecipe::getScheduledAt).reversed())
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
                if (controlRecipeRepository.existsByBatchNoIgnoreCaseAndIdNot(request.batchNo(), id)) {
                        throw new DuplicateResourceException("Batch No already exist.");
                }
                ControlRecipe controlRecipe = controlRecipeRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Control Recipe not found."));

                User shiftIncharge = userRepository.findById(request.shiftInchargeId())
                                .orElseThrow(() -> new ResourceNotFoundException("Shift Incharge User not found."));

                controlRecipeMapper.updateEntity(controlRecipe, request, shiftIncharge);
                controlRecipeRepository.save(controlRecipe);
        }

        private void createControlRecipeSnapshot(ControlRecipe controlRecipe, Recipe recipe) {
                List<RecipeSOP> recipeSOPs = recipeSOPRepository.findWithRelationsByRecipeId(recipe.getId());
                for (RecipeSOP recipeSOP : recipeSOPs) {
                        ControlRecipeSOP controlRecipeSOP = controlRecipeSOPRepository.save(
                                        controlRecipeSOPMapper.toEntity(recipeSOP, controlRecipe));

                        List<ControlRecipeSOPMaterial> materials = recipeSOP.getMaterials()
                                        .stream()
                                        .map(m -> controlRecipeSOPMaterialMapper.toEntity(controlRecipeSOP, m))
                                        .toList();

                        controlRecipeSOPMaterialRepository.saveAll(materials);

                        List<ControlRecipeSOPParameter> parameters = recipeSOP.getParameters()
                                        .stream()
                                        .map(p -> controlRecipeSOPParameterMapper.toEntity(controlRecipeSOP, p))
                                        .toList();

                        controlRecipeSOPParameterRepository.saveAll(parameters);
                }

        }
}
