package com.supertech.superbatch.recipe.recipe_sop.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe_sop.dto.CreateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPAudit;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPDependencies;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPMaterialSummaryResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPSummaryResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.UpdateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop.helper.RecipeSOPLookupService;
import com.supertech.superbatch.recipe.recipe_sop.loader.RecipeSOPDependencyLoader;
import com.supertech.superbatch.recipe.recipe_sop.mapper.RecipeSOPMapper;
import com.supertech.superbatch.recipe.recipe_sop.repository.RecipeSOPRepository;
import com.supertech.superbatch.recipe.recipe_sop.service.RecipeSOPService;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeSOPServiceImpl implements RecipeSOPService {
        private final RecipeSOPRepository recipeSOPRepository;
        private final RecipeRepository recipeRepository;
        private final RecipeSOPMapper recipeSOPMapper;
        private final RecipeSOPDependencyLoader recipeSOPDependencyLoader;
        private final BatchAuditService batchAuditService;
        private final RecipeSOPLookupService recipeSOPLookupService;

        @Override
        public RecipeSOPResponse getById(Long id) {
                RecipeSOP recipeSOP = getRecipeSOP(id);
                return recipeSOPMapper.toResponse(recipeSOP, recipeSOP.getMaterials(), recipeSOP.getParameters());
        }

        @Override
        public List<RecipeSOPResponse> getAllByRecipeId(Long recipeId) {
                List<RecipeSOP> recipeSOPs = recipeSOPRepository.findWithRelationsByRecipeId(recipeId);
                return recipeSOPs.stream()
                                .sorted(Comparator.comparing(RecipeSOP::getStepNo))
                                .map(recipeSOP -> recipeSOPMapper.toResponse(recipeSOP, recipeSOP.getMaterials(),
                                                recipeSOP.getParameters()))
                                .toList();
        }

        @Override
        public void create(CreateRecipeSOPRequest request) {
                List<RecipeSOP> steps = recipeSOPRepository.findAllByRecipeId(request.recipeId());
                Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
                Recipe recipe = getRecipe(request.recipeId());
                RecipeSOPDependencies deps = recipeSOPDependencyLoader.loadInsertDependencies(request, recipe, null);
                RecipeSOP recipeSOP = recipeSOPMapper.toEntity(
                                request,
                                stepNo,
                                recipe,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment(),
                                recipeSOPLookupService.getMaterialMap(request.materials()),
                                recipeSOPLookupService.getParameterMap(request.parameters()));
                recipeSOPRepository.save(recipeSOP);
                audit(BatchAuditAction.CREATED, null, recipeSOPMapper.copy(recipeSOP));

        }

        @Transactional
        @Override
        public void update(UpdateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = getRecipeSOP(request.id());
                Recipe recipe = getRecipe(request.recipeId());
                RecipeSOPDependencies deps = recipeSOPDependencyLoader.loadInsertDependencies(request, recipe,
                                recipeSOP.getId());
                RecipeSOPAudit oldData = recipeSOPMapper.copy(recipeSOP);
                recipeSOPMapper.updateEntity(
                                request,
                                recipeSOP,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment(),
                                recipeSOPLookupService.getMaterialMap(request.materials()),
                                recipeSOPLookupService.getParameterMap(request.parameters()));
                recipeSOPRepository.save(recipeSOP);
                audit(BatchAuditAction.UPDATED, oldData, recipeSOPMapper.copy(recipeSOP));
        }

        @Transactional
        @Override
        public void delete(Long id) {
                RecipeSOP recipeSOP = getRecipeSOP(id);
                audit(BatchAuditAction.DELETED, recipeSOPMapper.copy(recipeSOP), null);
                recipeSOPRepository.decrementStepNumbers(recipeSOP.getRecipe().getId(), recipeSOP.getStepNo());
                recipeSOPRepository.delete(recipeSOP);
        }

        @Override
        @Transactional
        public void moveUp(Long recipeSOPId) {
                move(recipeSOPId, -1);
        }

        @Override
        @Transactional
        public void moveDown(Long recipeSOPId) {
                move(recipeSOPId, 1);
        }

        @Override
        @Transactional
        public void insertAbove(Long recipeSOPId, CreateRecipeSOPRequest request) {
                insert(recipeSOPId, request, true);
        }

        @Override
        @Transactional
        public void insertBelow(Long recipeSOPId, CreateRecipeSOPRequest request) {
                insert(recipeSOPId, request, false);
        }

        @Override
        public RecipeSOPSummaryResponse getSummaryByRecipeId(Long recipeId) {
                Recipe recipe = getRecipe(recipeId);

                Integer batchSize = recipe.getBatchSize();
                List<RecipeSOP> recipeSOPs = recipeSOPRepository.findWithRelationsByRecipeId(recipe.getId());
                int totalSteps = recipeSOPs.size();
                double totalDuration = recipeSOPs.stream()
                                .map(RecipeSOP::getStdTime)
                                .filter(Objects::nonNull)
                                .mapToDouble(Double::doubleValue)
                                .sum();

                List<RecipeSOPMaterial> recipeSOPMaterials = recipeSOPs.stream()
                                .flatMap(recipeSOP -> recipeSOP.getMaterials().stream())
                                .toList();

                Map<Long, RecipeSOPMaterialSummaryResponse> materialMap = recipeSOPMaterials.stream()
                                .collect(Collectors.toMap(
                                                m -> m.getMaterial().getId(),
                                                m -> new RecipeSOPMaterialSummaryResponse(
                                                                m.getMaterial().getId(),
                                                                m.getMaterial().getName(),
                                                                m.getStdQty()),
                                                (existing, current) -> new RecipeSOPMaterialSummaryResponse(
                                                                existing.id(),
                                                                existing.name(),
                                                                existing.stdQty() + current.stdQty())));

                List<RecipeSOPMaterialSummaryResponse> materials = new ArrayList<>(materialMap.values());

                return new RecipeSOPSummaryResponse(batchSize, totalSteps, materials.size(),
                                totalDuration, materials);

        }

        private void move(Long recipeSOPId, int direction) {
                RecipeSOP current = getRecipeSOP(recipeSOPId);

                if (direction < 0 && current.getStepNo() == 1) {
                        throw new BadRequestException("Step 1 cannot be moved up.");
                }

                RecipeSOP other = recipeSOPRepository.findByRecipeIdAndStepNo(
                                current.getRecipe().getId(),
                                current.getStepNo() + direction)
                                .orElseThrow(() -> new ResourceNotFoundException("Adjacent step not found."));

                int currentStep = current.getStepNo();
                current.setStepNo(other.getStepNo());
                other.setStepNo(currentStep);

                recipeSOPRepository.saveAll(List.of(current, other));
        }

        private void insert(Long recipeSOPId, CreateRecipeSOPRequest request, boolean above) {
                RecipeSOP current = getRecipeSOP(recipeSOPId);
                Recipe recipe = getRecipe(request.recipeId());
                RecipeSOPDependencies deps = recipeSOPDependencyLoader.loadInsertDependencies(request, recipe, null);

                int stepNo = current.getStepNo();
                if (above) {
                        recipeSOPRepository.incrementStepNumbersFrom(current.getRecipe().getId(), stepNo);
                } else {
                        recipeSOPRepository.incrementStepNumbersAfter(current.getRecipe().getId(), stepNo);
                        stepNo++;
                }
                RecipeSOP recipeSOP = recipeSOPMapper.toEntity(
                                request,
                                stepNo,
                                current.getRecipe(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment(),
                                recipeSOPLookupService.getMaterialMap(request.materials()),
                                recipeSOPLookupService.getParameterMap(request.parameters()));

                recipeSOPRepository.save(recipeSOP);
                audit(BatchAuditAction.CREATED, null, recipeSOPMapper.copy(recipeSOP));
        }

        private void audit(BatchAuditAction action, RecipeSOPAudit oldData, RecipeSOPAudit newData) {
                batchAuditService.save(
                                BatchAuditRequest.builder()
                                                .entity(EntityType.RECIPE_SOP)
                                                .module(ModuleType.RECIPE)
                                                .action(action)
                                                .oldData(oldData)
                                                .newData(newData)
                                                .build());
        }

        private Recipe getRecipe(Long id) {
                return recipeRepository.findByIdWithRelations(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
        }

        private RecipeSOP getRecipeSOP(Long id) {
                return recipeSOPRepository.findWithRelationsById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
        }
}
