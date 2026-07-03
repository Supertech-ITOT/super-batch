package com.supertech.superbatch.recipe.recipe_material.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.enums.TransitionType;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_material.service.RecipeMaterialService;

import lombok.RequiredArgsConstructor;

import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialRequest;
import com.supertech.superbatch.recipe.recipe_material.enitiy.RecipeMaterial;
import com.supertech.superbatch.recipe.recipe_material.mapper.RecipeMaterialMapper;
import com.supertech.superbatch.recipe.recipe_material.repository.RecipeMaterialRepository;

@Service
@RequiredArgsConstructor
public class RecipeMaterialServiceImpl implements RecipeMaterialService {
    private final RecipeMaterialRepository recipeMaterialRepository;
    private final MaterialRepository materialRepository;
    private final RecipeMaterialMapper recipeMaterialMapper;

    @Override
    public void create(Recipe recipe, List<RecipeMaterialRequest> materials) {
        if (materials == null || materials.isEmpty()) {
            return;
        }
        List<RecipeMaterial> recipeMaterials = materials.stream()
                .map(request -> {
                    Material material = materialRepository.findById(request.id())
                            .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
                    return recipeMaterialMapper.toEntity(recipe, material, request);
                })
                .toList();
        recipeMaterialRepository.saveAll(recipeMaterials);
    }

    @Override
    public void update(Recipe recipe, List<RecipeMaterialRequest> materials) {
        deleteByRecipe(recipe);
        create(recipe, materials);
    }

    @Override
    public void deleteByRecipe(Recipe recipe) {
        recipeMaterialRepository.deleteAllByRecipe(recipe);
    }

    @Override
    public void validate(Transition transition, List<RecipeMaterialRequest> materials) {
        materials = materials == null ? List.of() : materials;

        if (TransitionType.AUTO_MATERIAL_CHARGE.getDisplayName().equals(transition.getName())
                && materials.size() != 1) {
            throw new BadRequestException("Auto material charging step must contain exactly one material.");
        }

        if (TransitionType.MANUAL_MATERIAL_CHARGE.getDisplayName().equals(transition.getName())
                && materials.isEmpty()) {
            throw new BadRequestException("Manual material charging step must contain at least one material.");
        }
    }
}
