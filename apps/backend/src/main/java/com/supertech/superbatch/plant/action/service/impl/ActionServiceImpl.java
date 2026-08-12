package com.supertech.superbatch.plant.action.service.impl;

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
import com.supertech.superbatch.plant.action.dto.ActionResponse;
import com.supertech.superbatch.plant.action.dto.CreateActionRequest;
import com.supertech.superbatch.plant.action.dto.UpdateActionRequest;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.action.mapper.ActionMapper;
import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.action.service.ActionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActionServiceImpl implements ActionService {
    private final ActionRepository actionMasterRepository;
    private final ActionMapper actionMapper;
    private final UserRepository userRepository;

    @Override
    public List<ActionResponse> getAll() {
        return actionMasterRepository.findAllByDeletedFalse(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(actionMapper::toResponse)
                .toList();
    }

    @Override
    public ActionResponse getById(Long id) {
        Action parameter = actionMasterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        return actionMapper.toResponse(parameter);
    }

    @Override
    @Transactional
    public void create(CreateActionRequest request) {
        if (actionMasterRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())) {
            throw new DuplicateResourceException("Action name already exists");
        }
        Action actionMaster = actionMapper.toEntity(request);
        actionMasterRepository.save(actionMaster);
    }

    @Override
    @Transactional
    public void update(Long id, UpdateActionRequest request) {
        Action actionMaster = actionMasterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found"));

        if (actionMasterRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())
                && !actionMaster.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Action name already exists");
        }
        actionMapper.updateEntity(actionMaster, request);
        actionMasterRepository.save(actionMaster);
    }

    @Override
    @Transactional
    public void delete(Long id, Long currentUserId) {
        Action actionMaster = actionMasterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
        if (!actionMaster.getCanDelete()) {
            throw new BadRequestException("Cannot delete standard action");
        }
        User deletedBy = userRepository.findByIdAndDeletedFalse(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));

        actionMaster.setDeleted(true);
        actionMaster.setDeletedAt(LocalDateTime.now());
        actionMaster.setDeletedBy(deletedBy);
        actionMasterRepository.save(actionMaster);
    }

}
