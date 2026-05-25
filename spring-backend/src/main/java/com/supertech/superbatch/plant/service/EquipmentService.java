package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Equipment.CreateEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.EquipmentResponse;
import com.supertech.superbatch.plant.dto.Equipment.UpdateEquipmentRequest;

public interface EquipmentService {

    void create(CreateEquipmentRequest request);

    List<EquipmentResponse> getAll();

    EquipmentResponse getById(Long id);

    List<EquipmentResponse> getByUnitId(long unitId);

    void update(Long id, UpdateEquipmentRequest request);

    void delete(Long id);

}