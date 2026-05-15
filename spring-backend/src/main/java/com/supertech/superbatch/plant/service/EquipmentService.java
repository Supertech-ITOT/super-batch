package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Equipment.CreateEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.entity.Equipment;

public interface EquipmentService {

    Equipment create(CreateEquipmentRequest request);

    List<Equipment> getAll();

    Equipment getById(Long id);

    List<Equipment> getByUnitId(long unitId);

    Equipment update(Long id, UpdateEquipmentRequest request);

    void delete(Long id);

}