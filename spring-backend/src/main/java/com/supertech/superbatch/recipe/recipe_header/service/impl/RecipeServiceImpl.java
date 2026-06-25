package com.supertech.superbatch.recipe.recipe_header.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.Users;
import com.supertech.superbatch.manager.user.repository.UsersRepository;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;
import com.supertech.superbatch.recipe.recipe_header.dto.CreateRecipeHeaderRequest;
import com.supertech.superbatch.recipe.recipe_header.dto.RecipeHeaderResponse;
import com.supertech.superbatch.recipe.recipe_header.dto.UpdateRecipeHeaderRequest;
import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;
import com.supertech.superbatch.recipe.recipe_header.mapper.RecipeHeaderMapper;
import com.supertech.superbatch.recipe.recipe_header.repository.RecipeHeaderRepository;
import com.supertech.superbatch.recipe.recipe_header.service.RecipeHeaderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class RecipeServiceImpl implements RecipeHeaderService {
        private final RecipeHeaderRepository recipeHeaderRepository;
        private final MaterialRepository materialRepository;
        private final UnitRepository unitRepository;
        private final RecipeHeaderMapper recipeHeaderMapper;
        private final UsersRepository usersRepository;

        @Override
        public void delete(Long id) {
                RecipeHeader recipeHeader = recipeHeaderRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Recipe header not found."));
                recipeHeaderRepository.delete(recipeHeader);
        }

        @Override
        public void create(CreateRecipeHeaderRequest request, Long userId) {
                Material material = materialRepository.findById(request.materialId())
                                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));

                Unit unit = unitRepository.findByIdWithHierarchy(request.unitId())
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
                Users users = usersRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                RecipeHeader recipeHeader = recipeHeaderMapper.toEntity(request, material, users, unit);
                recipeHeaderRepository.save(recipeHeader);
        }

        @Override
        public List<RecipeHeaderResponse> getAll() {
                return recipeHeaderRepository.findAll().stream().map(recipeHeaderMapper::toResponse).toList();
        }

        @Override
        public RecipeHeaderResponse getById(Long id) {
                RecipeHeader recipeHeader = recipeHeaderRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Recipe header not found."));
                return recipeHeaderMapper.toResponse(recipeHeader);
        }

        @Override
        public void update(Long id, UpdateRecipeHeaderRequest request) {
                Material material = materialRepository.findById(request.materialId())
                                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
                Unit unit = unitRepository.findByIdWithHierarchy(request.unitId())
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
                RecipeHeader recipeHeader = recipeHeaderRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Recipe header not found."));
                recipeHeaderMapper.updateEntity(recipeHeader, request, material, unit);
                recipeHeaderRepository.save(recipeHeader);
        }
}
