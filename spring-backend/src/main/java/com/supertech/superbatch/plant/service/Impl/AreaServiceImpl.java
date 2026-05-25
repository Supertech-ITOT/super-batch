package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Area.AreaResponse;
import com.supertech.superbatch.plant.dto.Area.CreateAreaRequest;
import com.supertech.superbatch.plant.dto.Area.UpdateAreaRequest;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.entity.Plant;
import com.supertech.superbatch.plant.mapper.AreaMapper;
import com.supertech.superbatch.plant.repository.AreaRepository;
import com.supertech.superbatch.plant.repository.PlantRepository;
import com.supertech.superbatch.plant.repository.UnitRepository;
import com.supertech.superbatch.plant.service.AreaService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AreaServiceImpl implements AreaService {
    private final AreaRepository areaRepository;
    private final PlantRepository plantRepository;
    private final UnitRepository unitRepository;
    private final AreaMapper areaMapper;

    @Override
    public void create(CreateAreaRequest request) {

        if (areaRepository.existsByNameIgnoreCaseAndPlantId(request.name(), request.plantId())) {
            throw new DuplicateResourceException("Area already exists");
        }
        Plant plant = plantRepository
                .findById(request.plantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        Area area = Area.builder().name(request.name()).plant(plant).build();
        areaRepository.save(area);
    }

    @Override
    public List<AreaResponse> getAll() {
        return areaRepository.findAll().stream().map(areaMapper::toResponse).toList();
    }

    @Override
    public AreaResponse getById(Long id) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        return areaMapper.toResponse(area);
    }

    @Override
    public List<AreaResponse> getByPlantId(Long plantId) {
        return areaRepository.findByPlantId(plantId).stream().map(areaMapper::toResponse).toList();
    }

    @Override
    public void update(Long id, UpdateAreaRequest request) {
        Area area = areaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Area not found"));

        if (areaRepository.existsByNameIgnoreCaseAndPlantId(request.name(), area.getPlant().getId())
                && !area.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Area already exists");
        }

        area.setName(request.name());
        areaRepository.save(area);
    }

    @Override
    public void delete(Long id) {
        if (unitRepository.existsByAreaId(id)) {
            throw new BadRequestException("Cannot delete area with units");
        }
        Area area = areaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        areaRepository.delete(area);
    }

}
