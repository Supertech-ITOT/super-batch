package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Unit.UnitResponse;
import com.supertech.superbatch.plant.dto.UnitConnection.UnitConnectionRequest;
import com.supertech.superbatch.plant.dto.UnitConnection.UnitConnectionResponse;
import com.supertech.superbatch.plant.entity.UnitConnection;
import com.supertech.superbatch.plant.enums.UnitType;
import com.supertech.superbatch.plant.mapper.UnitConnectionMapper;
import com.supertech.superbatch.plant.repository.UnitConnectionRepository;
import com.supertech.superbatch.plant.service.UnitConnectionService;
import com.supertech.superbatch.plant.service.UnitService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class UnitConnectionServiceImpl implements UnitConnectionService {

    private final UnitService unitService;
    private final UnitConnectionRepository unitConnectionRepository;
    private final UnitConnectionMapper unitConnectionMapper;

    @Override
    public void create(UnitConnectionRequest request) {
        validate(request);
        UnitConnection unitConnection = unitConnectionMapper.toEntity(request);
        unitConnectionRepository.save(unitConnection);
    }

    @Override
    @Transactional
    public void update(Long id, UnitConnectionRequest request) {
        validate(request);
        UnitConnection unitConnection = unitConnectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit connection not found."));
        unitConnectionMapper.updateEntity(unitConnection, request);
        unitConnectionRepository.save(unitConnection);
    }

    @Override
    @Transactional
    public UnitConnectionResponse getById(Long id) {
        UnitConnection unitConnection = unitConnectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit connection not found."));

        return unitConnectionMapper.toResponse(unitConnection);
    }

    @Override
    @Transactional
    public List<UnitConnectionResponse> getAll() {
        return unitConnectionRepository.findAll()
                .stream()
                .map(unitConnectionMapper::toResponse)
                .toList();
    }

    @Override
    public void delete(Long id) {
        UnitConnection unitConnection = unitConnectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unit connection not found."));

        unitConnectionRepository.delete(unitConnection);
    }

    private void validate(UnitConnectionRequest request) {

        if (request.sourceUnitId().equals(request.destinationUnitId())) {
            throw new BadRequestException("Source and destination units cannot be same");
        }

        UnitResponse source = unitService.getById(request.sourceUnitId());
        UnitResponse destination = unitService.getById(request.destinationUnitId());
        if (source.unitType() == UnitType.MAIN_EQUIPMENT && destination.unitType() == UnitType.MAIN_EQUIPMENT) {
            throw new BadRequestException("Connection between two main equipments is not allowed");
        }

        boolean exists = unitConnectionRepository.existsBySourceUnitIdAndDestinationUnitId(request.sourceUnitId(),
                request.destinationUnitId());
        if (exists) {
            throw new DuplicateResourceException("Connection already exists");
        }
    }
}