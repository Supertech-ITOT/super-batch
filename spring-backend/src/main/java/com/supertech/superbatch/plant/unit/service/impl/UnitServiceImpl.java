package com.supertech.superbatch.plant.unit.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.area.entity.Area;
import com.supertech.superbatch.plant.area.repository.AreaRepository;
import com.supertech.superbatch.plant.equipment.dto.CreateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.equipment.service.EquipmentService;
import com.supertech.superbatch.plant.unit.dto.CreateUnitRequest;
import com.supertech.superbatch.plant.unit.dto.UnitResponse;
import com.supertech.superbatch.plant.unit.dto.UpdateUnitRequest;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.mapper.UnitMapper;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;
import com.supertech.superbatch.plant.unit.service.UnitService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UnitServiceImpl implements UnitService {
    private final UnitRepository unitRepository;
    private final AreaRepository areaRepository;
    private final EquipmentRepository equipmentRepository;
    private final UnitMapper unitMapper;
    private final EquipmentService equipmentService;

    @Override
    @Transactional
    public void create(CreateUnitRequest request) {

        if (unitRepository.existsByNameIgnoreCaseAndAreaId(request.name(), request.areaId())) {
            throw new DuplicateResourceException("Unit already exists");
        }
        Area area = areaRepository
                .findById(request.areaId())
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        Unit unit = unitMapper.toEntity(request, area);
        unitRepository.save(unit);

        CreateEquipmentRequest createEquipmentRequest = CreateEquipmentRequest.builder()
                .name(request.name())
                .code(request.code())
                .capacity(request.capacity())
                .description(request.description())
                .unitId(unit.getId())
                .build();

        equipmentService.create(createEquipmentRequest);

    }

    @Override
    public List<UnitResponse> getAll() {
        return unitRepository.findAllHierarchy().stream().map(unitMapper::toResponse).toList();
    }

    @Override
    public UnitResponse getById(Long id) {
        Unit unit = unitRepository.findByIdWithHierarchy(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        return unitMapper.toResponse(unit);
    }

    @Override
    public List<UnitResponse> getByAreaId(Long areaId) {
        return unitRepository.findByAreaId(areaId).stream().map(unitMapper::toResponse).toList();
    }

    @Override
    @Transactional
    public void update(Long id, UpdateUnitRequest request) {
        Unit unit = unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        Area area = areaRepository.findById(request.areaId())
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));

        if (unitRepository.existsByNameIgnoreCaseAndAreaId(request.name(), unit.getArea().getId())
                && !unit.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Unit already exists");
        }

        Equipment mainEquipment = equipmentRepository
                .findByCreatorUnitIdAndEquipmentType(id, EquipmentType.MAIN_EQUIPMENT)
                .orElseThrow(() -> new ResourceNotFoundException("Main equipment not found."));

        if (!mainEquipment.getName().equalsIgnoreCase(request.name())
                && equipmentRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Equipment already exists");
        }

        unitMapper.updateEntity(unit, request, area);
        unitRepository.save(unit);

        UpdateEquipmentRequest updateEquipmentRequest = UpdateEquipmentRequest.builder()
                .name(request.name())
                .code(request.code())
                .capacity(request.capacity())
                .description(request.description())
                .build();
        equipmentService.update(mainEquipment.getId(), updateEquipmentRequest, false);
    }

    @Override
    @Transactional
    public void delete(Long id) {

        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));

        // Any equipment assigned to this unit except its own main equipment?
        if (equipmentRepository.existsNonCreatorEquipmentByUnitId(id)) {
            throw new BadRequestException(
                    "Cannot delete unit. Reassign or remove all equipments first.");
        }

        Equipment mainEquipment = equipmentRepository
                .findByCreatorUnitIdAndEquipmentType(id, EquipmentType.MAIN_EQUIPMENT)
                .orElseThrow(() -> new ResourceNotFoundException("Main equipment not found."));

        // Main equipment is still shared with other units
        if (mainEquipment.getUnits().size() > 1) {
            throw new BadRequestException(
                    "Main equipment is assigned to other units. Unassign it first.");
        }

        equipmentRepository.delete(mainEquipment);
        unitRepository.delete(unit);
    }

    @Override
    public Unit getUnitById(Long id) {
        Unit unit = unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found."));
        return unit;
    }

}
