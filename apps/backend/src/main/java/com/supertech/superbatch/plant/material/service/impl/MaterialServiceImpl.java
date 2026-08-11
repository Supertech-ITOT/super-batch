package com.supertech.superbatch.plant.material.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.material.dto.CreateMaterialRequest;
import com.supertech.superbatch.plant.material.dto.MaterialResponse;
import com.supertech.superbatch.plant.material.dto.UpdateMaterialRequest;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.mapper.MaterialMapper;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.material.service.MaterialService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {
    private final MaterialRepository materialRepository;
    private final MaterialMapper materialMapper;
    private final UserRepository userRepository;

    @Override
    public void create(CreateMaterialRequest request) {
        if (materialRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())) {
            throw new DuplicateResourceException("Material name already exists");
        }

        if (materialRepository.existsByCodeIgnoreCaseAndDeletedFalse(request.code())) {
            throw new DuplicateResourceException("Material code already exists");
        }
        Material material = materialMapper.toEntity(request);
        materialRepository.save(material);
    }

    @Override
    public List<MaterialResponse> getAll() {
        return materialRepository.findAllByDeletedFalse(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(materialMapper::toResponse)
                .toList();
    }

    @Override
    public MaterialResponse getById(Long id) {
        Material material = materialRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));
        return materialMapper.toResponse(material);
    }

    @Override
    public void update(Long id, UpdateMaterialRequest request) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));

        if (materialRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())
                && !material.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Material name already exists");
        }

        if (materialRepository.existsByCodeIgnoreCaseAndDeletedFalse(request.code())
                && !material.getCode().equalsIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Material code already exists");
        }
        materialMapper.updateEntity(material, request);
        materialRepository.save(material);
    }

    @Override
    public void delete(Long id, Long currentUserId) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));

        User deletedBy = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));

        material.setDeleted(true);
        material.setDeletedAt(LocalDateTime.now());
        material.setDeletedBy(deletedBy);

        materialRepository.save(material);
    }
}
