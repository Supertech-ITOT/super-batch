package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Equipment.AssignEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.CreateEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.EquipmentResponse;
import com.supertech.superbatch.plant.dto.Equipment.UnAssignEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.entity.Equipment;
import com.supertech.superbatch.plant.entity.Unit;
import com.supertech.superbatch.plant.enums.EquipmentType;
import com.supertech.superbatch.plant.mapper.EquipmentMapper;
import com.supertech.superbatch.plant.repository.EquipmentRepository;
import com.supertech.superbatch.plant.repository.UnitRepository;
import com.supertech.superbatch.plant.service.EquipmentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EquipmentServiceImpl implements EquipmentService {
    private final EquipmentRepository equipmentRepository;
    private final UnitRepository unitRepository;
    private final EquipmentMapper equipmentMapper;

    @Override
    public void create(CreateEquipmentRequest request) {
        if (equipmentRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Equipment already exists");
        }
        Unit unit = unitRepository.findById(request.unitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        Equipment equipment = equipmentMapper.toEntity(request, unit, EquipmentType.SUB_EQUIPMENT);
        equipmentRepository.save(equipment);
    }

    @Override
    public List<EquipmentResponse> getAll() {
        return equipmentRepository.findAllWithUnits().stream().map(equipmentMapper::toResponse).toList();
    }

    @Override
    public EquipmentResponse getById(Long id) {
        Equipment equipment = equipmentRepository.findByIdWithUnits(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));
        return equipmentMapper.toResponse(equipment);
    }

    @Override
    public List<EquipmentResponse> getByUnitId(long unitId) {
        return equipmentRepository.findByUnitId(unitId).stream().map(equipmentMapper::toResponse).toList();
    }

    @Override
    public void update(Long id, UpdateEquipmentRequest request) {

        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        if (!equipment.getName().equalsIgnoreCase(request.name())
                && equipmentRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Equipment already exists");
        }

        equipmentMapper.updateEntity(equipment, request);

        equipmentRepository.save(equipment);
    }

    @Override
    public void delete(Long id) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));
        equipmentRepository.delete(equipment);
    }

    @Override
    public void assign(AssignEquipmentRequest request) {

        Equipment equipment = equipmentRepository.findByIdWithUnits(request.equipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        Unit unit = unitRepository.findById(request.unitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));

        boolean alreadyAssigned = equipment.getUnits()
                .stream()
                .anyMatch(u -> u.getId().equals(unit.getId()));

        if (alreadyAssigned) {
            throw new DuplicateResourceException("Equipment already assigned");
        }

        equipment.getUnits().add(unit);

        equipmentRepository.save(equipment);
    }

    @Override
    public void unassign(UnAssignEquipmentRequest request) {

        Equipment equipment = equipmentRepository.findByIdWithUnits(request.equipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        boolean removed = equipment.getUnits()
                .removeIf(unit -> unit.getId().equals(request.unitId()));

        if (!removed) {
            throw new ResourceNotFoundException(
                    "Equipment is not assigned to the specified unit");
        }

        equipmentRepository.save(equipment);
    }

}
