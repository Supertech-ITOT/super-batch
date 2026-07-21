package com.supertech.superbatch.scheduler.control_recipe_sop_material.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.mapper.ControlRecipeSOPMaterialMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.repository.ControlRecipeSOPMaterialRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.service.ControlRecipeSOPMaterialService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class ControlRecipeSOPMaterialServiceImpl implements ControlRecipeSOPMaterialService {
    private final ControlRecipeSOPMaterialRepository controlRecipeSOPMaterialRepository;
    private final MaterialRepository materialRepository;
    private final ControlRecipeSOPMaterialMapper controlRecipeSOPMaterialMapper;

    @Override
    public List<ControlRecipeSOPMaterialResponse> getAllByControlRecipe(ControlRecipeSOP controlRecipeSOP) {
        List<ControlRecipeSOPMaterial> controlrecipeSOPMaterials = controlRecipeSOPMaterialRepository
                .findAllByControlRecipeSOP(controlRecipeSOP);
        return controlRecipeSOPMaterialMapper.toResponseList(controlrecipeSOPMaterials);
    }

    @Override
    public void create(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPMaterialRequest> materials) {
        if (materials == null || materials.isEmpty()) {
            return;
        }
        List<ControlRecipeSOPMaterial> controlRecipeSOPMaterials = materials.stream()
                .map(request -> {
                    Material material = materialRepository.findById(request.materialId())
                            .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
                    return controlRecipeSOPMaterialMapper.toEntity(controlRecipeSOP, material, request);
                })
                .toList();
        controlRecipeSOPMaterialRepository.saveAll(controlRecipeSOPMaterials);
    }

    @Override
    public void update(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPMaterialRequest> materials) {
        deleteByControlRecipeSOP(controlRecipeSOP);
        create(controlRecipeSOP, materials);
    }

    @Override
    public void deleteByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP) {
        controlRecipeSOPMaterialRepository.deleteAllByRecipeSOP(controlRecipeSOP);
    }

}
