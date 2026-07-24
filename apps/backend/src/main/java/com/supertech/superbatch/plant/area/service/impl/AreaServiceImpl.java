package com.supertech.superbatch.plant.area.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.plant.area.dto.AreaResponse;
import com.supertech.superbatch.plant.area.dto.CreateAreaRequest;
import com.supertech.superbatch.plant.area.dto.UpdateAreaRequest;
import com.supertech.superbatch.plant.area.entity.Area;
import com.supertech.superbatch.plant.area.mapper.AreaMapper;
import com.supertech.superbatch.plant.area.repository.AreaRepository;
import com.supertech.superbatch.plant.area.service.AreaService;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.plant.entity.Plant;
import com.supertech.superbatch.plant.plant.repository.PlantRepository;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AreaServiceImpl implements AreaService {
    private final AreaRepository areaRepository;
    private final PlantRepository plantRepository;
    private final UnitRepository unitRepository;
    private final AreaMapper areaMapper;
    private final BatchAuditService batchAuditService;

    @Override
    @Transactional
    public void create(CreateAreaRequest request) {

        if (areaRepository.existsByNameIgnoreCaseAndPlantId(request.name(), request.plantId())) {
            throw new DuplicateResourceException("Area already exists");
        }
        Plant plant = plantRepository
                .findById(request.plantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        Area area = areaMapper.toEntity(request, plant);
        areaRepository.save(area);
        BatchAuditRequest batchAuditRequest = BatchAuditRequest.builder()
                .entityId(area.getId())
                .entityName(area.getName())
                .action(BatchAuditAction.CREATED)
                .module(ModuleType.PLANT_MODEL)
                .oldData(null)
                .newData(areaMapper.toResponse(area))
                .build();
        batchAuditService.save(batchAuditRequest);
    }

    @Override
    public List<AreaResponse> getAll() {
        return areaRepository.findAllHierarchy().stream().map(areaMapper::toResponse).toList();
    }

    @Override
    public AreaResponse getById(Long id) {
        Area area = areaRepository.findByIdWithHierarchy(id)
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        return areaMapper.toResponse(area);
    }

    @Override
    public List<AreaResponse> getByPlantId(Long plantId) {
        return areaRepository.findByPlantId(plantId).stream().map(areaMapper::toResponse).toList();
    }

    @Override
    @Transactional
    public void update(Long id, UpdateAreaRequest request) {
        Area area = areaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        Plant plant = plantRepository.findById(request.plantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));

        if (areaRepository.existsByNameIgnoreCaseAndPlantId(request.name(), area.getPlant().getId())
                && !area.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Area already exists");
        }
        Area oldData = areaMapper.copy(area);
        areaMapper.updateEntity(area, request, plant);
        areaRepository.save(area);
        BatchAuditRequest batchAuditRequest = BatchAuditRequest.builder()
                .entityId(plant.getId())
                .entityName(plant.getName())
                .action(BatchAuditAction.UPDATED)
                .module(ModuleType.PLANT_MODEL)
                .oldData(oldData)
                .newData(areaMapper.toResponse(area))
                .build();
        batchAuditService.save(batchAuditRequest);
    }

    @Override
    public void delete(Long id) {
        if (unitRepository.existsByAreaId(id)) {
            throw new BadRequestException("Cannot delete area with units");
        }
        Area area = areaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        BatchAuditRequest batchAuditRequest = BatchAuditRequest.builder()
                .entityId(area.getId())
                .entityName(area.getName())
                .action(BatchAuditAction.DELETED)
                .module(ModuleType.PLANT_MODEL)
                .oldData(areaMapper.copy(area))
                .newData(null)
                .build();

        batchAuditService.save(batchAuditRequest);
        areaRepository.delete(area);
    }

}
