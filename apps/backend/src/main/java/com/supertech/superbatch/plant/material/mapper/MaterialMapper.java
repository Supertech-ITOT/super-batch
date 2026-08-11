package com.supertech.superbatch.plant.material.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.material.dto.CreateMaterialRequest;
import com.supertech.superbatch.plant.material.dto.MaterialResponse;
import com.supertech.superbatch.plant.material.dto.UpdateMaterialRequest;
import com.supertech.superbatch.plant.material.entity.Material;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MaterialMapper {

    public MaterialResponse toResponse(Material material) {
        return MaterialResponse.builder()
                .id(material.getId())
                .code(material.getCode())
                .name(material.getName())
                .materialType(material.getMaterialType())
                .description(material.getDescription())
                .createdAt(material.getCreatedAt())
                .updatedAt(material.getUpdatedAt())
                .build();
    }

    public Material toEntity(CreateMaterialRequest request) {
        return Material.builder()
                .name(request.name())
                .code(request.code())
                .materialType(request.materialType())
                .description(request.description())
                .build();

    }

    public void updateEntity(Material material, UpdateMaterialRequest request) {
        material.setName(request.name());
        material.setCode(request.code());
        material.setDescription(request.description());
        material.setMaterialType(request.materialType());
    }
}
