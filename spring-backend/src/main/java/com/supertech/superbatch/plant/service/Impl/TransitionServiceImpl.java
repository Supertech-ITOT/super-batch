package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Transition.TransitionResponse;
import com.supertech.superbatch.plant.entity.TransitionMaster;
import com.supertech.superbatch.plant.mapper.TransitionMapper;
import com.supertech.superbatch.plant.repository.TransitionMasterRepository;
import com.supertech.superbatch.plant.service.TransitionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransitionServiceImpl implements TransitionService {
    private final TransitionMasterRepository transitionMasterRepository;
    private final TransitionMapper transitionMapper;

    @Override
    public List<TransitionResponse> getAll() {
        return transitionMasterRepository.findAll().stream().map(transitionMapper::toResponse).toList();
    }

    @Override
    public TransitionResponse getById(Long id) {
        TransitionMaster parameter = transitionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));
        return transitionMapper.toResponse(parameter);
    }

}
