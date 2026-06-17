package com.supertech.superbatch.plant.service;

import java.util.List;
import com.supertech.superbatch.plant.dto.UnitConnection.UnitConnectionRequest;
import com.supertech.superbatch.plant.dto.UnitConnection.UnitConnectionResponse;

public interface UnitConnectionService {

    void create(UnitConnectionRequest request);

    void update(Long id, UnitConnectionRequest request);

    UnitConnectionResponse getById(Long id);

    List<UnitConnectionResponse> getAll();

    void delete(Long id);
}