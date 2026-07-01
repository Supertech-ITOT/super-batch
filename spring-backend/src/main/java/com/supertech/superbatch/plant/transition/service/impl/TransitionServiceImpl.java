package com.supertech.superbatch.plant.transition.service.impl;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.transition.dto.CreateTransitionRequest;
import com.supertech.superbatch.plant.transition.dto.TransitionResponse;
import com.supertech.superbatch.plant.transition.dto.UpdateTransitionRequest;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.mapper.TransitionMapper;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;
import com.supertech.superbatch.plant.transition.service.TransitionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransitionServiceImpl implements TransitionService {
    private final TransitionRepository transitionRepository;
    private final TransitionMapper transitionMapper;

    @Override
    public List<TransitionResponse> getAll() {
        return transitionRepository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(transitionMapper::toResponse).toList();
    }

    @Override
    public TransitionResponse getById(Long id) {
        Transition transition = transitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));
        return transitionMapper.toResponse(transition);
    }

    @Override
    public void create(CreateTransitionRequest request) {
        if (transitionRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Transition name already exists");
        }
        Transition transitionMaster = transitionMapper.toEntity(request);
        transitionRepository.save(transitionMaster);
    }

    @Override
    public void update(Long id, UpdateTransitionRequest request) {
        Transition transitionMaster = transitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found"));

        if (transitionRepository.existsByNameIgnoreCase(request.name())
                && !transitionMaster.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Transition name already exists");
        }

        transitionMapper.updateEntity(transitionMaster, request);
        transitionRepository.save(transitionMaster);
    }

    @Override
    public void delete(Long id) {
        Transition transitionMaster = transitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));
        if (!transitionMaster.getCanDelete()) {
            throw new BadRequestException("Cannot delete standard transition.");
        }
        transitionRepository.delete(transitionMaster);
    }

}
