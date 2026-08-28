package com.supertech.superbatch.plant.plant.service.impl;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.area.repository.AreaRepository;
import com.supertech.superbatch.plant.plant.dto.CreatePlantRequest;
import com.supertech.superbatch.plant.plant.dto.PlantAudit;
import com.supertech.superbatch.plant.plant.dto.PlantResponse;
import com.supertech.superbatch.plant.plant.dto.UpdatePlantRequest;
import com.supertech.superbatch.plant.plant.entity.Plant;
import com.supertech.superbatch.plant.plant.mapper.PlantMapper;
import com.supertech.superbatch.plant.plant.repository.PlantRepository;
import com.supertech.superbatch.plant.plant.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlantServiceImpl implements PlantService {
    private final PlantRepository plantRepository;
    private final AreaRepository areaRepository;
    private final PlantMapper plantMapper;
    private final BatchAuditService batchAuditService;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void create(CreatePlantRequest request) {
        if (plantRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())) {
            throw new DuplicateResourceException("Plant already exists");
        }
        Plant plant = plantMapper.toEntity(request);
        plantRepository.save(plant);
        audit(BatchAuditAction.CREATED, null, plantMapper.copy(plant));

    }

    @Override
    public List<PlantResponse> getAll() {
        return plantRepository.findAllHierarchy().stream().map(plantMapper::toResponse).toList();
    }

    @Override
    public PlantResponse getById(Long id) {
        Plant plant = plantRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        return plantMapper.toResponse(plant);
    }

    @Override
    @Transactional
    public void update(Long id, UpdatePlantRequest request) {
        Plant plant = plantRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        if (plantRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())
                && !plant.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Plant already exists");
        }
        PlantAudit oldData = plantMapper.copy(plant);
        plantMapper.updateEntity(plant, request);
        plantRepository.save(plant);
        audit(BatchAuditAction.UPDATED, oldData, plantMapper.copy(plant));

    }

    @Override
    @Transactional
    public void delete(Long id, Long currentUserId) {
        Plant plant = plantRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
        if (areaRepository.existsByPlantIdAndDeletedFalse(id)) {
            throw new BadRequestException("Cannot delete plant with areas");
        }
        audit(BatchAuditAction.DELETED, plantMapper.copy(plant), null);
        User deletedBy = userRepository.findByIdAndDeletedFalse(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));
        plant.setDeleted(true);
        plant.setDeletedAt(LocalDateTime.now());
        plant.setDeletedBy(deletedBy);
        plantRepository.save(plant);
    }

    private void audit(BatchAuditAction action, PlantAudit oldData, PlantAudit newData) {
        batchAuditService.save(
                BatchAuditRequest.builder()
                        .entity(EntityType.PLANT)
                        .module(ModuleType.PLANT_MODEL)
                        .action(action)
                        .oldData(oldData)
                        .newData(newData)
                        .build());
    }

}