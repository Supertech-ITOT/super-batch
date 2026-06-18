package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Equipment.CreateEquipmentRequest;
import com.supertech.superbatch.plant.dto.Unit.CreateUnitRequest;
import com.supertech.superbatch.plant.dto.Unit.UnitResponse;
import com.supertech.superbatch.plant.dto.Unit.UpdateUnitRequest;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.entity.Equipment;
import com.supertech.superbatch.plant.entity.Unit;
import com.supertech.superbatch.plant.enums.EquipmentType;
import com.supertech.superbatch.plant.mapper.EquipmentMapper;
import com.supertech.superbatch.plant.mapper.UnitMapper;
import com.supertech.superbatch.plant.repository.AreaRepository;
import com.supertech.superbatch.plant.repository.EquipmentRepository;
import com.supertech.superbatch.plant.repository.UnitRepository;
import com.supertech.superbatch.plant.service.UnitService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UnitServiceImpl implements UnitService {
    private final UnitRepository unitRepository;
    private final AreaRepository areaRepository;
    private final EquipmentRepository equipmentRepository;
    private final UnitMapper unitMapper;
    private final EquipmentMapper equipmentMapper;

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

        Equipment equipment = equipmentMapper.toEntity(createEquipmentRequest, unit, EquipmentType.MAIN_EQUIPMENT);
        equipmentRepository.save(equipment);
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
    public void update(Long id, UpdateUnitRequest request) {
        Unit unit = unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        Area area = areaRepository.findById(request.areaId())
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));

        if (unitRepository.existsByNameIgnoreCaseAndAreaId(request.name(), unit.getArea().getId())
                && !unit.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Unit already exists");
        }

        unitMapper.updateEntity(unit, request, area);
        unitRepository.save(unit);
    }

    @Override
    public void delete(Long id) {
        if (equipmentRepository.existsByUnitId(id)) {
            throw new BadRequestException("Cannot delete unit with equipments");
        }
        Unit unit = unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        unitRepository.delete(unit);
    }

    @Override
    public Unit getUnitById(Long id) {
        Unit unit = unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found."));
        return unit;
    }

}
