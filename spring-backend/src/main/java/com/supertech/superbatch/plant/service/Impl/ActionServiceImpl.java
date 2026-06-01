package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Action.ActionResponse;
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

}
