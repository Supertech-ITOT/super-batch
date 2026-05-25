package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Unit.CreateUnitRequest;
import com.supertech.superbatch.plant.dto.Unit.UnitResponse;
import com.supertech.superbatch.plant.dto.Unit.UpdateUnitRequest;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.entity.Unit;
import com.supertech.superbatch.plant.mapper.UnitMapper;
import com.supertech.superbatch.plant.repository.AreaRepository;
import com.supertech.superbatch.plant.repository.EquipmentRepository;
import com.supertech.superbatch.plant.repository.UnitRepository;
import com.supertech.superbatch.plant.service.UnitService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UnitServiceImpl implements UnitService {
    private final UnitRepository unitRepository;
    private final AreaRepository areaRepository;
    private final EquipmentRepository equipmentRepository;
    private final UnitMapper unitMapper;

    @Override
    public void create(CreateUnitRequest request) {

        if (unitRepository.existsByNameIgnoreCaseAndAreaId(request.name(), request.areaId())) {
            throw new DuplicateResourceException("Unit already exists");
        }
        Area area = areaRepository
                .findById(request.areaId())
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        Unit unit = Unit.builder().name(request.name()).unitType(request.unitType()).area(area).build();
        unitRepository.save(unit);
    }

    @Override
    public List<UnitResponse> getAll() {
        return unitRepository.findAll().stream().map(unitMapper::toResponse).toList();
    }

    @Override
    public UnitResponse getById(Long id) {
        Unit unit = unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        return unitMapper.toResponse(unit);
    }

    @Override
    public List<UnitResponse> getByAreaId(Long areaId) {
        return unitRepository.findByAreaId(areaId).stream().map(unitMapper::toResponse).toList();
    }

    @Override
    public void update(Long id, UpdateUnitRequest request) {
        Unit unit = unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found"));

        if (unitRepository.existsByNameIgnoreCaseAndAreaId(request.name(), unit.getArea().getId())
                && !unit.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Unit already exists");
        }

        unit.setName(request.name());
        unit.setUnitType(request.unitType());
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

}
