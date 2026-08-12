package com.supertech.superbatch.plant.transition.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
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
@Transactional(readOnly = true)
public class TransitionServiceImpl implements TransitionService {
    private final TransitionRepository transitionRepository;
    private final TransitionMapper transitionMapper;
    private final UserRepository userRepository;

    @Override
    public List<TransitionResponse> getAll() {
        return transitionRepository.findAllByDeletedFalse(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(transitionMapper::toResponse).toList();
    }

    @Override
    public TransitionResponse getById(Long id) {
        Transition transition = transitionRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));
        return transitionMapper.toResponse(transition);
    }

    @Override
    @Transactional
    public void create(CreateTransitionRequest request) {
        if (transitionRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())) {
            throw new DuplicateResourceException("Transition name already exists");
        }
        Transition transition = transitionMapper.toEntity(request);
        transitionRepository.save(transition);
    }

    @Override
    @Transactional
    public void update(Long id, UpdateTransitionRequest request) {
        Transition transition = transitionRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found"));

        if (transitionRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())
                && !transition.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Transition name already exists");
        }

        transitionMapper.updateEntity(transition, request);
        transitionRepository.save(transition);
    }

    @Override
    @Transactional
    public void delete(Long id, Long currentUserId) {
        Transition transition = transitionRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));
        if (!transition.getCanDelete()) {
            throw new BadRequestException("Cannot delete standard transition.");
        }

        User deletedBy = userRepository.findByIdAndDeletedFalse(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));

        transition.setDeleted(true);
        transition.setDeletedAt(LocalDateTime.now());
        transition.setDeletedBy(deletedBy);
        transitionRepository.save(transition);
    }

}
