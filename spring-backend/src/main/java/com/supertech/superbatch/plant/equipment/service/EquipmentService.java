package com.supertech.superbatch.plant.equipment.service;

import java.util.List;

import com.supertech.superbatch.plant.equipment.dto.AssignEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.CreateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.EquipmentResponse;
import com.supertech.superbatch.plant.equipment.dto.UnAssignEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.UpdateEquipmentRequest;

public interface EquipmentService {

    void create(CreateEquipmentRequest request);

    void assign(AssignEquipmentRequest request);

    void unassign(UnAssignEquipmentRequest request);

    List<EquipmentResponse> getAll();

    EquipmentResponse getById(Long id);

    List<EquipmentResponse> getByUnitId(long unitId);

    void update(Long id, UpdateEquipmentRequest request);

    void delete(Long id);

}