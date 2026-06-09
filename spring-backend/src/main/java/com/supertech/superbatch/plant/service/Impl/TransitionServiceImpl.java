package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Transition.CreateTransitionRequest;
import com.supertech.superbatch.plant.dto.Transition.UpdateTransitionRequest;
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
        TransitionMaster transition = transitionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));
        return transitionMapper.toResponse(transition);
    }

    @Override
    public void create(CreateTransitionRequest request) {
        if (transitionMasterRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Transition name already exists");
        }
        if (transitionMasterRepository.existsByCodeIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Transition code already exists");
        }
        TransitionMaster transitionMaster = transitionMapper.toEntity(request);
        transitionMasterRepository.save(transitionMaster);
    }

    @Override
    public void update(Long id, UpdateTransitionRequest request) {
        TransitionMaster transitionMaster = transitionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found"));
        if (transitionMasterRepository.existsByNameIgnoreCase(request.name())
                && !transitionMaster.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Transition name already exists");
        }

        if (transitionMasterRepository.existsByCodeIgnoreCase(request.code())
                && !transitionMaster.getCode().equalsIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Transition code already exists");
        }
        transitionMapper.updateEntity(transitionMaster, request);
        transitionMasterRepository.save(transitionMaster);
    }

    @Override
    public void delete(Long id) {
        TransitionMaster transitionMaster = transitionMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));
        transitionMasterRepository.delete(transitionMaster);
    }

}
