package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Material.CreateMaterialRequest;
import com.supertech.superbatch.plant.dto.Material.MaterialResponse;
import com.supertech.superbatch.plant.dto.Material.UpdateMaterialRequest;
import com.supertech.superbatch.plant.entity.Material;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MaterialMapper {
    private final UomMapper uomMapper;

    public MaterialResponse toResponse(Material material) {
        return new MaterialResponse(
                material.getId(),
                material.getCode(),
                material.getName(),
                material.getMaterialType(),
                uomMapper.toResponse(material.getUom()),
                material.getDescription(),
                material.getCreatedAt(),
                material.getUpdatedAt());
    }

    public Material toEntity(CreateMaterialRequest request) {
        return Material.builder()
                .name(request.name())
                .code(request.code())
                .materialType(request.materialType())
                .description(request.description())
                .uom(request.uom()).build();

    }

    public void updateEntity(Material material, UpdateMaterialRequest request) {
        material.setName(request.name());
        material.setCode(request.code());
        material.setDescription(request.description());
        material.setUom(request.uom());
        material.setMaterialType(request.materialType());
    }
}
