package com.supertech.superbatch.plant.unit.service.impl;

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
import com.supertech.superbatch.plant.area.entity.Area;
import com.supertech.superbatch.plant.area.repository.AreaRepository;
import com.supertech.superbatch.plant.equipment.dto.CreateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.EquipmentAudit;
import com.supertech.superbatch.plant.equipment.dto.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;
import com.supertech.superbatch.plant.equipment.mapper.EquipmentMapper;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.unit.dto.CreateUnitRequest;
import com.supertech.superbatch.plant.unit.dto.UnitAudit;
import com.supertech.superbatch.plant.unit.dto.UnitResponse;
import com.supertech.superbatch.plant.unit.dto.UpdateUnitRequest;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.mapper.UnitMapper;
import com.supertech.superbatch.plant.unit.repository.UnitRepository;
import com.supertech.superbatch.plant.unit.service.UnitService;
import com.supertech.superbatch.recipe.recipe.repository.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@RequiresPermission(ModuleType.PLANT_MODEL)
@RequiresLicense()
@Transactional(readOnly = true)
public class UnitServiceImpl implements UnitService {
        private final UnitRepository unitRepository;
        private final AreaRepository areaRepository;
        private final EquipmentRepository equipmentRepository;
        private final UnitMapper unitMapper;
        private final EquipmentMapper equipmentMapper;
        private final BatchAuditService batchAuditService;
        private final UserRepository userRepository;
        private final RecipeRepository recipeRepository;

        @Override
        @Transactional
        public void create(CreateUnitRequest request) {

                Area area = areaRepository
                                .findByIdAndDeletedFalse(request.areaId())
                                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));

                if (unitRepository.existsByNameIgnoreCaseAndAreaIdAndDeletedFalse(request.name(), request.areaId())) {
                        throw new DuplicateResourceException("Unit name already exists");
                }
                if (unitRepository.existsByCodeIgnoreCaseAndDeletedFalse(request.code())) {
                        throw new DuplicateResourceException("Unit code already exists");
                }

                if (equipmentRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())) {
                        throw new DuplicateResourceException("Equipment name already exists");
                }
                if (equipmentRepository.existsByCodeIgnoreCaseAndDeletedFalse(request.code())) {
                        throw new DuplicateResourceException("Equipment code already exists");
                }

                Unit unit = unitMapper.toEntity(request, area);
                unitRepository.save(unit);

                CreateEquipmentRequest createEquipmentRequest = CreateEquipmentRequest.builder()
                                .name(request.name())
                                .code(request.code())
                                .capacity(request.capacity())
                                .description(request.description())
                                .unitId(unit.getId())
                                .build();
                Equipment equipment = equipmentMapper.toEntity(createEquipmentRequest, unit,
                                EquipmentType.MAIN_EQUIPMENT);
                equipmentRepository.save(equipment);

                audit(BatchAuditAction.CREATED, null, unitMapper.copy(unit));
                audit(BatchAuditAction.CREATED, null, equipmentMapper.copy(equipment));

        }

        @Override
        public List<UnitResponse> getAll() {
                return unitRepository.findAllHierarchy().stream().map(unitMapper::toResponse).toList();
        }

        @Override
        @Transactional
        public void update(Long id, UpdateUnitRequest request) {
                Area area = areaRepository.findByIdAndDeletedFalse(request.areaId())
                                .orElseThrow(() -> new ResourceNotFoundException("Area not found"));
                Unit unit = unitRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));

                if (unitRepository.existsByNameIgnoreCaseAndAreaIdAndDeletedFalseAndIdNot(request.name(),
                                request.areaId(), id)) {
                        throw new DuplicateResourceException("Unit name already exists");
                }

                if (unitRepository.existsByCodeIgnoreCaseAndDeletedFalseAndIdNot(
                                request.code(), id)) {
                        throw new DuplicateResourceException("Unit code already exists");
                }

                Equipment mainEquipment = equipmentRepository
                                .findByCreatorUnitIdAndEquipmentTypeAndDeletedFalse(id, EquipmentType.MAIN_EQUIPMENT)
                                .orElseThrow(() -> new ResourceNotFoundException("Main equipment not found."));

                if (equipmentRepository.existsByNameIgnoreCaseAndDeletedFalseAndIdNot(request.name(),
                                mainEquipment.getId())) {
                        throw new DuplicateResourceException("Equipment name already exists");
                }

                if (equipmentRepository.existsByCodeIgnoreCaseAndDeletedFalseAndIdNot(
                                request.code(), mainEquipment.getId())) {
                        throw new DuplicateResourceException("Equipment code already exists");
                }

                UnitAudit unitOldData = unitMapper.copy(unit);
                unitMapper.updateEntity(unit, request, area);
                unitRepository.save(unit);

                EquipmentAudit equipmentOldData = equipmentMapper.copy(mainEquipment);
                UpdateEquipmentRequest updateEquipmentRequest = UpdateEquipmentRequest.builder()
                                .name(request.name())
                                .code(request.code())
                                .capacity(request.capacity())
                                .description(request.description())
                                .build();
                equipmentMapper.updateEntity(mainEquipment, updateEquipmentRequest);
                equipmentRepository.save(mainEquipment);

                audit(BatchAuditAction.UPDATED, unitOldData, unitMapper.copy(unit));
                audit(BatchAuditAction.UPDATED, equipmentOldData, equipmentMapper.copy(mainEquipment));

        }

        @Override
        public UnitResponse getById(Long id) {
                Unit unit = unitRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));
                return unitMapper.toResponse(unit);
        }

        @Override
        public List<UnitResponse> getByAreaId(Long areaId) {
                return unitRepository.findByAreaIdAndDeletedFalse(areaId).stream().map(unitMapper::toResponse).toList();
        }

        @Override
        @Transactional
        public void delete(Long id, Long currentUserId) {

                Unit unit = unitRepository.findByIdAndDeletedFalse(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Unit not found"));

                if (recipeRepository.existsByUnitIdAndDeletedFalse(id)) {
                        throw new BadRequestException(
                                        "Cannot delete unit. It is being used by one or more recipes.");
                }

                // Any equipment assigned to this unit except its own main equipment?
                if (equipmentRepository.existsActiveOtherEquipmentByUnitId(id)) {
                        throw new BadRequestException(
                                        "Cannot delete unit. Reassign or remove all equipments first.");
                }

                Equipment mainEquipment = equipmentRepository
                                .findByCreatorUnitIdAndEquipmentTypeAndDeletedFalse(id, EquipmentType.MAIN_EQUIPMENT)
                                .orElseThrow(() -> new ResourceNotFoundException("Main equipment not found."));

                // Main equipment is still shared with other units
                if (equipmentRepository.existsActiveOtherUnit(mainEquipment.getId(), id)) {
                        throw new BadRequestException(
                                        "Main equipment is assigned to other units. Unassign it first.");
                }

                audit(BatchAuditAction.DELETED, unitMapper.copy(unit), null);
                audit(BatchAuditAction.DELETED, equipmentMapper.copy(mainEquipment), null);

                User deletedBy = userRepository.findByIdAndDeletedFalse(currentUserId)
                                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));
                unit.setDeleted(true);
                unit.setDeletedAt(LocalDateTime.now());
                unit.setDeletedBy(deletedBy);
                unitRepository.save(unit);

                mainEquipment.setDeleted(true);
                mainEquipment.setDeletedAt(LocalDateTime.now());
                mainEquipment.setDeletedBy(deletedBy);
                equipmentRepository.save(mainEquipment);

        }

        private void audit(BatchAuditAction action, UnitAudit oldData, UnitAudit newData) {
                batchAuditService.save(
                                BatchAuditRequest.builder()
                                                .entity(EntityType.UNIT)
                                                .module(ModuleType.PLANT_MODEL)
                                                .action(action)
                                                .oldData(oldData)
                                                .newData(newData)
                                                .build());
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
