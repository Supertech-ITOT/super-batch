package com.supertech.superbatch.plant.area.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.area.dto.AreaAudit;
import com.supertech.superbatch.plant.area.dto.AreaResponse;
import com.supertech.superbatch.plant.area.dto.CreateAreaRequest;
import com.supertech.superbatch.plant.area.dto.UpdateAreaRequest;
import com.supertech.superbatch.plant.area.entity.Area;
import com.supertech.superbatch.plant.area.mapper.AreaMapper;
import com.supertech.superbatch.plant.area.repository.AreaRepository;
import com.supertech.superbatch.plant.area.service.AreaService;
import com.supertech.superbatch.plant.plant.entity.Plant;
import com.supertech.superbatch.plant.plant.repository.PlantRepository;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@RequiresPermission(ModuleType.PLANT_MODEL)
@RequiresLicense()
public class AreaServiceImpl implements AreaService {
    private final AreaRepository areaRepository;
    private final PlantRepository plantRepository;
    private final UnitRepository unitRepository;
    private final AreaMapper areaMapper;
    private final BatchAuditService batchAuditService;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void create(CreateAreaRequest request) {

        if (areaRepository.existsByNameIgnoreCaseAndPlantIdAndDeletedFalse(request.name(), request.plantId())) {
            throw new DuplicateResourceException("Area already exists");
        }
        Plant plant = plantRepository
                .findByIdAndDeletedFalse(request.plantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        Area area = areaMapper.toEntity(request, plant);
        areaRepository.save(area);
        audit(BatchAuditAction.CREATED, null, areaMapper.copy(area));

    }

    @Override
    public List<AreaResponse> getAll() {
        return areaRepository.findAllHierarchy().stream().map(areaMapper::toResponse).toList();
    }

    @Override
    public AreaResponse getById(Long id) {
        Area area = areaRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        return areaMapper.toResponse(area);
    }

    @Override
    public List<AreaResponse> getByPlantId(Long plantId) {
        return areaRepository.findByPlantIdAndDeletedFalse(plantId).stream().map(areaMapper::toResponse).toList();
    }

    @Override
    @Transactional
    public void update(Long id, UpdateAreaRequest request) {
        Area area = areaRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        Plant plant = plantRepository.findByIdAndDeletedFalse(request.plantId())
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));

        if (areaRepository.existsByNameIgnoreCaseAndPlantIdAndDeletedFalseAndIdNot(
                request.name(),
                request.plantId(),
                id)) {
            throw new DuplicateResourceException("Area already exists");
        }
        AreaAudit oldData = areaMapper.copy(area);
        areaMapper.updateEntity(area, request, plant);
        areaRepository.save(area);
        audit(BatchAuditAction.UPDATED, oldData, areaMapper.copy(area));

    }

    @Override
    @Transactional
    public void delete(Long id, Long currentUserId) {
        Area area = areaRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        if (unitRepository.existsByAreaIdAndDeletedFalse(id)) {
            throw new BadRequestException("Cannot delete area with units");
        }
        audit(BatchAuditAction.DELETED, areaMapper.copy(area), null);
        User deletedBy = userRepository.findByIdAndDeletedFalse(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));
        area.setDeleted(true);
        area.setDeletedAt(LocalDateTime.now());
        area.setDeletedBy(deletedBy);
        areaRepository.save(area);

    }

    private void audit(BatchAuditAction action, AreaAudit oldData, AreaAudit newData) {
        batchAuditService.save(
                BatchAuditRequest.builder()
                        .entity(EntityType.AREA)
                        .module(ModuleType.PLANT_MODEL)
                        .action(action)
                        .oldData(oldData)
                        .newData(newData)
                        .build());
    }

}
