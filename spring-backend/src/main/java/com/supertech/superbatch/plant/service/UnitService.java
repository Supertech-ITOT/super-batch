package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Unit.CreateUnitRequest;
import com.supertech.superbatch.plant.dto.Unit.UpdateUnitRequest;
import com.supertech.superbatch.plant.entity.Unit;

public interface UnitService {
    Unit create(CreateUnitRequest request);

    List<Unit> getAll();

    Unit getById(Long id);

    List<Unit> getByAreaId(Long areaId);

    Unit update(Long id, UpdateUnitRequest request);

    void delete(Long id);
}
