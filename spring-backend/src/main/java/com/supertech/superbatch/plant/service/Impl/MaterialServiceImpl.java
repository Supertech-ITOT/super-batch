package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Material.CreateMaterialRequest;
import com.supertech.superbatch.plant.dto.Material.MaterialResponse;
import com.supertech.superbatch.plant.dto.Material.UpdateMaterialRequest;
import com.supertech.superbatch.plant.entity.Material;
import com.supertech.superbatch.plant.mapper.MaterialMapper;
import com.supertech.superbatch.plant.repository.MaterialRepository;
import com.supertech.superbatch.plant.service.MaterialService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {
    private final MaterialRepository materialRepository;
    private final MaterialMapper materialMapper;

    @Override
    public void create(CreateMaterialRequest request) {
        if (materialRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Material name already exists");
        }

        if (materialRepository.existsByCodeIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Material code already exists");
        }
        Material material = materialMapper.toEntity(request);
        materialRepository.save(material);
    }

    @Override
    public List<MaterialResponse> getAll() {
        return materialRepository.findAll().stream().map(materialMapper::toResponse).toList();
    }

    @Override
    public MaterialResponse getById(Long id) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
        return materialMapper.toResponse(material);
    }

    @Override
    public void update(Long id, UpdateMaterialRequest request) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));
        if (materialRepository.existsByNameIgnoreCase(request.name())
                && !material.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Material name already exists");
        }

        if (materialRepository.existsByCodeIgnoreCase(request.code())
                && !material.getCode().equalsIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Material code already exists");
        }
        materialMapper.updateEntity(material, request);
        materialRepository.save(material);
    }

    @Override
    public void delete(Long id) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
        materialRepository.delete(material);
    }
}
