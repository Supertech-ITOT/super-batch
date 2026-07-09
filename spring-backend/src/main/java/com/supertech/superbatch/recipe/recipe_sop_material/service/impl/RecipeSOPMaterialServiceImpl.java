package com.supertech.superbatch.recipe.recipe_sop_material.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.enums.TransitionType;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialResponse;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;
import com.supertech.superbatch.recipe.recipe_sop_material.mapper.RecipeSOPMaterialMapper;
import com.supertech.superbatch.recipe.recipe_sop_material.repository.RecipeSOPMaterialRepository;
import com.supertech.superbatch.recipe.recipe_sop_material.service.RecipeSOPMaterialService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeSOPMaterialServiceImpl implements RecipeSOPMaterialService {
    private final RecipeSOPMaterialRepository recipeSOPMaterialRepository;
    private final MaterialRepository materialRepository;
    private final RecipeSOPMaterialMapper recipeSOPMaterialMapper;

    @Override
    public List<RecipeSOPMaterialResponse> getAllByRecipe(RecipeSOP recipeSOP) {
        List<RecipeSOPMaterial> recipeSOPMaterials = recipeSOPMaterialRepository.findAllByRecipeSOP(recipeSOP);
        return recipeSOPMaterialMapper.toResponseList(recipeSOPMaterials);
    }

    @Override
    public void create(RecipeSOP recipeSOP, List<RecipeSOPMaterialRequest> materials) {
        if (materials == null || materials.isEmpty()) {
            return;
        }
        List<RecipeSOPMaterial> recipeSOPMaterials = materials.stream()
                .map(request -> {
                    Material material = materialRepository.findById(request.materialId())
                            .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
                    return recipeSOPMaterialMapper.toEntity(recipeSOP, material, request);
                })
                .toList();
        recipeSOPMaterialRepository.saveAll(recipeSOPMaterials);
    }

    @Override
    public void update(RecipeSOP recipeSOP, List<RecipeSOPMaterialRequest> materials) {
        deleteByRecipeSOP(recipeSOP);
        create(recipeSOP, materials);
    }

    @Override
    public void deleteByRecipeSOP(RecipeSOP recipeSOP) {
        recipeSOPMaterialRepository.deleteAllByRecipeSOP(recipeSOP);
    }

    @Override
    public void validate(Transition transition, List<RecipeSOPMaterialRequest> materials) {
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
