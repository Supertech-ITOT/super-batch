package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Equipment.CreateEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.entity.Equipment;
import com.supertech.superbatch.plant.entity.Unit;
import com.supertech.superbatch.plant.repository.EquipmentRepository;
import com.supertech.superbatch.plant.repository.UnitRepository;
import com.supertech.superbatch.plant.service.EquipmentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EquipmentServiceImpl implements EquipmentService {
    private final EquipmentRepository equipmentRepository;
    private final UnitRepository unitRepository;

    @Override
    public Equipment create(CreateEquipmentRequest request) {
        if (equipmentRepository.existsByNameIgnoreCaseAndUnitId(request.name(), request.unitId())) {
            throw new DuplicateResourceException("Equipment already exists");
        }
        Unit unit = unitRepository.findById(request.unitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        Equipment equipment = Equipment.builder().name(request.name()).equipmentType(request.equipmentType()).unit(unit)
                .build();
        return equipmentRepository.save(equipment);
    }

    @Override
    public List<Equipment> getAll() {
        return equipmentRepository.findAll();
    }

    @Override
    public Equipment getById(Long id) {
        return equipmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));
    }

    @Override
    public List<Equipment> getByUnitId(long unitId) {
        return equipmentRepository.findByUnitId(unitId);
    }

    @Override
    public Equipment update(Long id, UpdateEquipmentRequest request) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        if (equipmentRepository.existsByNameIgnoreCaseAndUnitId(request.name(), equipment.getUnit().getId())
                && !equipment.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Equipment already exists");
        }

        equipment.setName(request.name());
        equipment.setEquipmentType(request.equipmentType());
        return equipmentRepository.save(equipment);
    }

    @Override
    public void delete(Long id) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));
        equipmentRepository.delete(equipment);
    }

}
