package com.supertech.superbatch.plant.plant.service.impl;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.area.repository.AreaRepository;
import com.supertech.superbatch.plant.plant.dto.CreatePlantRequest;
import com.supertech.superbatch.plant.plant.dto.PlantResponse;
import com.supertech.superbatch.plant.plant.dto.UpdatePlantRequest;
import com.supertech.superbatch.plant.plant.entity.Plant;
import com.supertech.superbatch.plant.plant.mapper.PlantMapper;
import com.supertech.superbatch.plant.plant.repository.PlantRepository;
import com.supertech.superbatch.plant.plant.service.PlantService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {
    private final PlantRepository plantRepository;
    private final AreaRepository areaRepository;
    private final PlantMapper plantMapper;

    @Override
    public void create(CreatePlantRequest request) {
        if (plantRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Plant already exists");
        }
        Plant plant = plantMapper.toEntity(request);
        plantRepository.save(plant);
    }

    @Override
    public List<PlantResponse> getAll() {
        return plantRepository.findAllHierarchy().stream().map(plantMapper::toResponse).toList();
    }

    @Override
    public PlantResponse getById(Long id) {
        Plant plant = plantRepository.findByIdWithHierarchy(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        return plantMapper.toResponse(plant);
    }

    @Override
    public void update(Long id, UpdatePlantRequest request) {
        Plant plant = plantRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        if (plantRepository.existsByNameIgnoreCase(request.name())
                && !plant.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Plant already exists");
        }
        plantMapper.updateEntity(plant, request);
        plantRepository.save(plant);
    }

    @Override
    public void delete(Long id) {
        if (areaRepository.existsByPlantId(id)) {
            throw new BadRequestException("Cannot delete plant with areas");
        }
        Plant plant = plantRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        plantRepository.delete(plant);
    }

}