package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.data.domain.Sort;
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
        return actionMasterRepository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream().map(actionMapper::toResponse)
                .toList();
    }

    @Override
    public ActionResponse getById(Long id) {
        ActionMaster parameter = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        return actionMapper.toResponse(parameter);
    }

    @Override
    public void create(CreateActionRequest request) {
        if (actionMasterRepository.existsById(request.id())) {
            throw new DuplicateResourceException("Action Id already exists");
        }
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
        ActionMaster actionMaster = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found"));

        if (!actionMaster.getId().equals(request.id())
                && actionMasterRepository.existsById(request.id())) {
            throw new DuplicateResourceException("Action id already exists");
        }
        if (actionMasterRepository.existsByNameIgnoreCase(request.name())
                && !actionMaster.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Action name already exists");
        }

        if (actionMasterRepository.existsByCodeIgnoreCase(request.code())
                && !actionMaster.getCode().equalsIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Action code already exists");
        }
        actionMapper.updateEntity(actionMaster, request);
        actionMasterRepository.save(actionMaster);
    }

    @Override
    public void delete(Long id) {
        ActionMaster actionMaster = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ActionMaster not found."));
        actionMasterRepository.delete(actionMaster);
    }

}
