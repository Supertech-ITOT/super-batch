package com.supertech.superbatch.recipe.recipe.service.impl;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.enums.RecipeQuantityType;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.RecipeAudit;
import com.supertech.superbatch.recipe.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe.enums.RecipeStatus;
import com.supertech.superbatch.recipe.recipe.mapper.RecipeMapper;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;
import com.supertech.superbatch.recipe.recipe.service.RecipeService;
import com.supertech.superbatch.recipe.recipe_sop.repository.RecipeSOPRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@RequiresPermission(ModuleType.RECIPE)
@RequiresLicense()
public class RecipeServiceImpl implements RecipeService {
        private final RecipeRepository recipeRepository;
        private final MaterialRepository materialRepository;
        private final UnitRepository unitRepository;
        private final RecipeMapper recipeMapper;
        private final UserRepository userRepository;
        private final BatchAuditService batchAuditService;
        private final RecipeSOPRepository recipeSOPRepository;

        @Override
        @Transactional
        public void delete(Long id, Long currentUserId) {
                Recipe recipe = recipeRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new RuntimeException("Recipe not found."));

                User deletedBy = userRepository.findByIdAndDeletedFalse(currentUserId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                recipe.setDeletedBy(deletedBy);
                recipe.setDeleted(true);
                recipe.setDeletedAt(LocalDateTime.now());
                recipeRepository.save(recipe);
                audit(BatchAuditAction.DELETED, recipeMapper.copy(recipe), null);

        }

        @Override
        @Transactional
        public void create(CreateRecipeRequest request, Long userId) {
                if (recipeRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())) {
                        throw new DuplicateResourceException("Recipe already exists.");
                }
                Material material = materialRepository.findByIdAndDeletedFalse(request.materialId())
                                .orElseThrow(() -> new ResourceNotFoundException("Product not found."));

                Unit unit = unitRepository.findByIdAndDeletedFalse(request.unitId())
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
                if (request.batchSize() > unit.getCapacity()) {
                        throw new BadRequestException("Batch size must be below unit capacity.");
                }
                User user = userRepository.findByIdAndDeletedFalse(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                Recipe recipe = recipeMapper.toEntity(request, material, user, unit, RecipeStatus.UNRELEASED);
                recipeRepository.save(recipe);

                audit(BatchAuditAction.CREATED, null, recipeMapper.copy(recipe));

        }

        @Override
        public List<RecipeResponse> getAll() {
                return recipeRepository.findAllWithRelations()
                                .stream()
                                .sorted(Comparator.comparing(Recipe::getCreatedAt).reversed())
                                .map(recipeMapper::toResponse)
                                .toList();
        }

        @Override
        public RecipeResponse getById(Long id) {
                Recipe recipe = recipeRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                return recipeMapper.toResponse(recipe);
        }

        @Override
        @Transactional
        public void update(Long id, UpdateRecipeRequest request) {
                Material material = materialRepository.findByIdAndDeletedFalse(request.materialId())
                                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
                Recipe recipe = recipeRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));

                if (request.batchSize() > recipe.getUnit().getCapacity()) {
                        throw new BadRequestException("Batch size must be below unit capacity.");
                }
                if (recipeRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name()) &&
                                !recipe.getName().equalsIgnoreCase(request.name())) {
                        throw new DuplicateResourceException("Recipe already exists.");
                }
                RecipeAudit oldData = recipeMapper.copy(recipe);
                recipeMapper.updateEntity(recipe, request, material);
                if (recipe.getStatus() == RecipeStatus.RELEASED) {
                        validateRelease(recipe);
                }
                recipeRepository.save(recipe);
                audit(BatchAuditAction.UPDATED, oldData, recipeMapper.copy(recipe));
        }

        private void audit(BatchAuditAction action, RecipeAudit oldData, RecipeAudit newData) {
                batchAuditService.save(
                                BatchAuditRequest.builder()
                                                .entity(EntityType.RECIPE)
                                                .module(ModuleType.RECIPE)
                                                .action(action)
                                                .oldData(oldData)
                                                .newData(newData)
                                                .build());
        }

        @Override
        public List<RecipeResponse> getAllByMaterialIdAndStatus(Long materialId, RecipeStatus status) {
                return recipeRepository.findAllByMaterialIdAndStatusAndDeletedFalse(materialId, status)
                                .stream()
                                .sorted(Comparator.comparing(Recipe::getCreatedAt).reversed())
                                .map(recipeMapper::toResponse)
                                .toList();
        }

        private static final double QUANTITY_TOLERANCE = 0.01;

        @Override
        @Transactional
        public void release(Long id) {
                Recipe recipe = recipeRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                if (recipe.getStatus() == RecipeStatus.RELEASED) {
                        throw new BadRequestException("Recipe is already released.");
                }
                validateRelease(recipe);
                recipe.setStatus(RecipeStatus.RELEASED);
                recipeRepository.save(recipe);
        }

        private void validateRelease(Recipe recipe) {

                Double totalMaterialValue = recipeSOPRepository.getTotalMaterialQtyByRecipeId(recipe.getId());

                RecipeQuantityType quantityType = recipe.getUnit().getRecipeQuantityType();

                if (quantityType == RecipeQuantityType.KG) {

                        double batchSize = recipe.getBatchSize();

                        if (Math.abs(totalMaterialValue - batchSize) > QUANTITY_TOLERANCE) {
                                throw new BadRequestException(String.format(
                                                "Total material quantity (%.2f kg) must equal recipe batch size (%d kg).",
                                                totalMaterialValue,
                                                recipe.getBatchSize()));
                        }

                } else if (quantityType == RecipeQuantityType.PERCENTAGE) {

                        if (Math.abs(totalMaterialValue - 100.0) > QUANTITY_TOLERANCE) {
                                throw new BadRequestException(String.format(
                                                "Total material percentage (%.2f%%) must equal 100%%.",
                                                totalMaterialValue));
                        }
                }
        }
}
