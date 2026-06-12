package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Action.ActionResponse;
import com.supertech.superbatch.plant.dto.Action.CreateActionRequest;
import com.supertech.superbatch.plant.dto.Action.UpdateActionRequest;
import com.supertech.superbatch.plant.entity.Action;
import com.supertech.superbatch.plant.mapper.ActionMapper;
import com.supertech.superbatch.plant.repository.ActionRepository;
import com.supertech.superbatch.plant.service.ActionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActionServiceImpl implements ActionService {
    private final ActionRepository actionMasterRepository;
    private final ActionMapper actionMapper;

    @Override
    public List<ActionResponse> getAll() {
        return actionMasterRepository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream().map(actionMapper::toResponse)
                .toList();
    }

    @Override
    public ActionResponse getById(Long id) {
        Action parameter = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        return actionMapper.toResponse(parameter);
    }

    @Override
    public void create(CreateActionRequest request) {
        if (actionMasterRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Action name already exists");
        }
        Action actionMaster = actionMapper.toEntity(request);
        actionMasterRepository.save(actionMaster);
    }

    @Override
    public void update(Long id, UpdateActionRequest request) {
        Action actionMaster = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found"));

        if (actionMasterRepository.existsByNameIgnoreCase(request.name())
                && !actionMaster.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Action name already exists");
        }
        actionMapper.updateEntity(actionMaster, request);
        actionMasterRepository.save(actionMaster);
    }

    @Override
    public void delete(Long id) {
        Action actionMaster = actionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        actionMasterRepository.delete(actionMaster);
    }

}
