package com.supertech.superbatch.plant.equipment.service.impl;

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
import com.supertech.superbatch.plant.equipment.dto.AssignEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.CreateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.EquipmentAudit;
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
import com.supertech.superbatch.recipe.recipe_sop.repository.RecipeSOPRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@RequiresPermission(ModuleType.PLANT_MODEL)
@RequiresLicense()
public class EquipmentServiceImpl implements EquipmentService {
    private final EquipmentRepository equipmentRepository;
    private final UnitRepository unitRepository;
    private final EquipmentMapper equipmentMapper;
    private final BatchAuditService batchAuditService;
    private final UserRepository userRepository;
    private final RecipeSOPRepository recipeSOPRepository;

    @Override
    @Transactional
    public void create(CreateEquipmentRequest request) {
        if (equipmentRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())) {
            throw new DuplicateResourceException("Equipment name already exists");
        }
        if (equipmentRepository.existsByCodeIgnoreCaseAndDeletedFalse(request.code())) {
            throw new DuplicateResourceException("Equipment code already exists");
        }
        Unit unit = unitRepository.findByIdAndDeletedFalse(request.unitId())
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
        Equipment equipment = equipmentMapper.toEntity(request, unit, EquipmentType.SUB_EQUIPMENT);
        equipmentRepository.save(equipment);

        audit(BatchAuditAction.CREATED, null, equipmentMapper.copy(equipment));

    }

    @Override
    public List<EquipmentResponse> getAll() {
        return equipmentRepository.findAllWithRelations().stream().map(equipmentMapper::toResponse).toList();
    }

    @Override
    public EquipmentResponse getById(Long id) {
        Equipment equipment = equipmentRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));
        return equipmentMapper.toResponse(equipment);
    }

    @Override
    public List<EquipmentResponse> getByUnitId(long unitId) {
        return equipmentRepository.findByUnitsIdAndDeletedFalse(unitId).stream().map(equipmentMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public void update(Long id, UpdateEquipmentRequest request) {

        Equipment equipment = equipmentRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        if (equipment.getEquipmentType() == EquipmentType.MAIN_EQUIPMENT) {
            throw new BadRequestException("Main equipment can only be updated through its unit.");
        }

        if (equipmentRepository.existsByNameIgnoreCaseAndDeletedFalseAndIdNot(request.name(), id)) {
            throw new DuplicateResourceException("Equipment name already exists");
        }
        if (equipmentRepository.existsByCodeIgnoreCaseAndDeletedFalseAndIdNot(request.code(), id)) {
            throw new DuplicateResourceException("Equipment code already exists");
        }

        EquipmentAudit oldData = equipmentMapper.copy(equipment);
        equipmentMapper.updateEntity(equipment, request);
        equipmentRepository.save(equipment);
        audit(BatchAuditAction.UPDATED, oldData, equipmentMapper.copy(equipment));

    }

    @Override
    @Transactional
    public void delete(Long id, Long currentUserId) {
        Equipment equipment = equipmentRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));
        if (equipment.getEquipmentType() == EquipmentType.MAIN_EQUIPMENT) {
            throw new BadRequestException(
                    "Main equipment cannot be deleted directly. Delete the creator unit to remove this equipment.");

        }
        if (recipeSOPRepository.existsByActiveRecipeAndEquipmentId(id)) {
            throw new BadRequestException(
                    "Cannot delete equipment. It is used in one or more active recipes.");
        }
        audit(BatchAuditAction.DELETED, equipmentMapper.copy(equipment), null);
        User deletedBy = userRepository.findByIdAndDeletedFalse(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));
        equipment.setDeleted(true);
        equipment.setDeletedAt(LocalDateTime.now());
        equipment.setDeletedBy(deletedBy);
        equipmentRepository.save(equipment);
    }

    @Override
    @Transactional
    public void assign(AssignEquipmentRequest request) {

        Equipment equipment = equipmentRepository.findByIdAndDeletedFalse(request.equipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        Unit unit = unitRepository.findByIdAndDeletedFalse(request.unitId())
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
    @Transactional
    public void unassign(UnAssignEquipmentRequest request) {

        Equipment equipment = equipmentRepository.findByIdAndDeletedFalse(request.equipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));

        if (equipment.getCreatorUnit() != null &&
                equipment.getCreatorUnit().getId().equals(request.unitId())
                && equipment.getEquipmentType().equals(EquipmentType.MAIN_EQUIPMENT)) {
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

    private void audit(BatchAuditAction action, EquipmentAudit oldData, EquipmentAudit newData) {
        batchAuditService.save(
                BatchAuditRequest.builder()
                        .entity(EntityType.EQUIPMENT)
                        .module(ModuleType.PLANT_MODEL)
                        .action(action)
                        .oldData(oldData)
                        .newData(newData)
                        .build());
    }

}
