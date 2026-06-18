package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Unit.CreateUnitRequest;
import com.supertech.superbatch.plant.dto.Unit.UpdateUnitRequest;
import com.supertech.superbatch.plant.entity.Unit;
import com.supertech.superbatch.plant.dto.Unit.UnitResponse;

public interface UnitService {
    void create(CreateUnitRequest request);

    List<UnitResponse> getAll();

    UnitResponse getById(Long id);

    Unit getUnitById(Long id);

    List<UnitResponse> getByAreaId(Long areaId);

    void update(Long id, UpdateUnitRequest request);

    void delete(Long id);

}