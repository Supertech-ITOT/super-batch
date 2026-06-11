package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Transition.CreateTransitionRequest;
import com.supertech.superbatch.plant.dto.Transition.UpdateTransitionRequest;
import com.supertech.superbatch.plant.dto.Transition.TransitionResponse;
import com.supertech.superbatch.plant.entity.Transition;
import com.supertech.superbatch.plant.mapper.TransitionMapper;
import com.supertech.superbatch.plant.repository.TransitionRepository;
import com.supertech.superbatch.plant.service.TransitionService;

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
        if (transitionRepository.existsById(request.id())) {
            throw new DuplicateResourceException("Transition id already exists");
        }
        if (transitionRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Transition name already exists");
        }
        if (transitionRepository.existsByCodeIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Transition code already exists");
        }
        Transition transitionMaster = transitionMapper.toEntity(request);
        transitionRepository.save(transitionMaster);
    }

    @Override
    public void update(Long id, UpdateTransitionRequest request) {
        Transition transitionMaster = transitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found"));

        if (!transitionMaster.getId().equals(request.id())
                && transitionRepository.existsById(request.id())) {
            throw new DuplicateResourceException("Transition id already exists");
        }

        if (transitionRepository.existsByNameIgnoreCase(request.name())
                && !transitionMaster.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Transition name already exists");
        }

        if (transitionRepository.existsByCodeIgnoreCase(request.code())
                && !transitionMaster.getCode().equalsIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Transition code already exists");
        }
        transitionMapper.updateEntity(transitionMaster, request);
        transitionRepository.save(transitionMaster);
    }

    @Override
    public void delete(Long id) {
        Transition transitionMaster = transitionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));
        transitionRepository.delete(transitionMaster);
    }

}
