package com.supertech.superbatch.plant.equipment.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.equipment.dto.AssignEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.CreateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.EquipmentResponse;
import com.supertech.superbatch.plant.equipment.dto.UnAssignEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;
import com.supertech.superbatch.plant.equipment.mapper.EquipmentMapper;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.equipment.service.EquipmentService;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;

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
        return equipmentRepository.findAllWithRelations().stream().map(equipmentMapper::toResponse).toList();
    }

    @Override
    public EquipmentResponse getById(Long id) {
        Equipment equipment = equipmentRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));
        return equipmentMapper.toResponse(equipment);
    }

    @Override
    public List<EquipmentResponse> getByUnitId(long unitId) {
        return equipmentRepository.findByUnitsId(unitId).stream().map(equipmentMapper::toResponse).toList();
    }

    @Override
    public void update(Long id, UpdateEquipmentRequest request) {

        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        if (equipment.getEquipmentType() == EquipmentType.MAIN_EQUIPMENT) {
            throw new BadRequestException(
                    "Main equipment can only be updated through its unit.");
        }

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
        if (equipment.getEquipmentType() == EquipmentType.MAIN_EQUIPMENT) {
            throw new BadRequestException(
                    "Main equipment cannot be deleted directly. Delete the creator unit to remove this equipment.");
        }
        equipmentRepository.delete(equipment);
    }

    @Override
    public void assign(AssignEquipmentRequest request) {

        Equipment equipment = equipmentRepository.findByIdWithRelations(request.equipmentId())
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

        Equipment equipment = equipmentRepository.findByIdWithRelations(request.equipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        if (equipment.getCreatorUnit() != null &&
                equipment.getCreatorUnit().getId().equals(request.unitId())) {
            throw new BadRequestException("Main equipment cannot be unassigned from its creator unit.");
        }

        boolean removed = equipment.getUnits()
                .removeIf(unit -> unit.getId().equals(request.unitId()));

        if (!removed) {
            throw new ResourceNotFoundException(
                    "Equipment is not assigned to the specified unit");
        }

        equipmentRepository.save(equipment);
    }

}
