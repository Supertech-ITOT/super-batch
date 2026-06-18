package com.supertech.superbatch.plant.unit.service;

import java.util.List;

import com.supertech.superbatch.plant.unit.dto.CreateUnitRequest;
import com.supertech.superbatch.plant.unit.dto.UnitResponse;
import com.supertech.superbatch.plant.unit.dto.UpdateUnitRequest;
import com.supertech.superbatch.plant.unit.entity.Unit;

public interface UnitService {
    void create(CreateUnitRequest request);

    List<UnitResponse> getAll();

    UnitResponse getById(Long id);

    Unit getUnitById(Long id);

    List<UnitResponse> getByAreaId(Long areaId);

    void update(Long id, UpdateUnitRequest request);

    void delete(Long id);

}