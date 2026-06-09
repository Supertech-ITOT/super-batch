package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Action.ActionResponse;
import com.supertech.superbatch.plant.dto.Action.CreateActionRequest;
import com.supertech.superbatch.plant.dto.Action.UpdateActionRequest;
import com.supertech.superbatch.plant.entity.ActionMaster;
import com.supertech.superbatch.plant.mapper.ActionMapper;
import com.supertech.superbatch.plant.repository.ActionMasterRepository;
import com.supertech.superbatch.plant.service.ActionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActionServiceImpl implements ActionService {
    private final ActionMasterRepository actionMasterRepository;
    private final ActionMapper actionMapper;

    @Override
    public List<ActionResponse> getAll() {
        return actionMasterRepository.findAll().stream().map(actionMapper::toResponse).toList();
    }

    @Override
    public ActionResponse getById(Long id) {
        ActionMaster parameter = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        return actionMapper.toResponse(parameter);
    }

    @Override
    public void create(CreateActionRequest request) {
        if (actionMasterRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Action name already exists");
        }
        if (actionMasterRepository.existsByCodeIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Action code already exists");
        }
        ActionMaster actionMaster = actionMapper.toEntity(request);
        actionMasterRepository.save(actionMaster);
    }

    @Override
    public void update(Long id, UpdateActionRequest request) {
        ActionMaster material = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ActionMaster not found"));
        if (actionMasterRepository.existsByNameIgnoreCase(request.name())
                && !material.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("ActionMaster name already exists");
        }

        if (actionMasterRepository.existsByCodeIgnoreCase(request.code())
                && !material.getCode().equalsIgnoreCase(request.code())) {
            throw new DuplicateResourceException("ActionMaster code already exists");
        }
        actionMapper.updateEntity(material, request);
        actionMasterRepository.save(material);
    }

    @Override
    public void delete(Long id) {
        ActionMaster material = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ActionMaster not found."));
        actionMasterRepository.delete(material);
    }

}
