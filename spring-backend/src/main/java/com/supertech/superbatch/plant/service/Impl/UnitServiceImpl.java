package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Unit.CreateUnitRequest;
import com.supertech.superbatch.plant.dto.Unit.UpdateUnitRequest;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.entity.Unit;
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

    @Override
    public Unit create(CreateUnitRequest request) {

        if (unitRepository.existsByNameIgnoreCaseAndAreaId(request.name(), request.areaId())) {
            throw new DuplicateResourceException("Unit already exists");
        }
        Area area = areaRepository
                .findById(request.areaId())
                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
        Unit unit = Unit.builder().name(request.name()).unitType(request.unitType()).area(area).build();
        return unitRepository.save(unit);
    }

    @Override
    public List<Unit> getAll() {
        return unitRepository.findAll();
    }

    @Override
    public Unit getById(Long id) {
        return unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
    }

    @Override
    public List<Unit> getByAreaId(Long areaId) {
        return unitRepository.findByAreaId(areaId);
    }

    @Override
    public Unit update(Long id, UpdateUnitRequest request) {
        Unit unit = unitRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Unit not found"));

        if (unitRepository.existsByNameIgnoreCaseAndAreaId(request.name(), unit.getArea().getId())
                && !unit.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Unit already exists");
        }

        unit.setName(request.name());
        unit.setUnitType(request.unitType());
        return unitRepository.save(unit);
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
