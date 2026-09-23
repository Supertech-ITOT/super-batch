package com.supertech.superbatch.sample_check.check_parameter.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.enums.MaterialType;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterAudit;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterRequest;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterResponse;
import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;
import com.supertech.superbatch.sample_check.check_parameter.mapper.CheckParameterMapper;
import com.supertech.superbatch.sample_check.check_parameter.repository.CheckParameterRepository;
import com.supertech.superbatch.sample_check.check_parameter.service.CheckParameterService;
import com.supertech.superbatch.sample_check.check_parameter_options.entity.CheckParameterOptions;
import com.supertech.superbatch.sample_check.check_parameter_options.repository.CheckParameterOptionsRepository;
import lombok.*;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CheckParameterServiceImpl implements CheckParameterService {
    private final CheckParameterRepository checkParameterRepository;
    private final CheckParameterOptionsRepository checkParameterOptionsRepository;
    private final MaterialRepository materialRepository;
    private final CheckParameterMapper checkParameterMapper;
    private final BatchAuditService batchAuditService;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void create(CheckParameterRequest request) {
        Material material = getFinishedProduct(request.product());
        CheckParameter checkParameter = checkParameterMapper.toEntity(request, material);
        CheckParameter saved = checkParameterRepository.save(checkParameter);
        saveOptions(saved, request.allowedOptions(), true);
        saveOptions(saved, request.notAllowedOptions(), false);
        audit(BatchAuditAction.CREATED, null, checkParameterMapper.copy(saved));
    }

    @Override
    @Transactional
    public void update(Long id, CheckParameterRequest request) {
        CheckParameter checkParameter = checkParameterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Check parameter not found: " + id));

        Material material = getFinishedProduct(request.product());
        CheckParameterAudit oldData = checkParameterMapper.copy(checkParameter);
        checkParameterMapper.updateEntity(checkParameter, request, material);
        checkParameterOptionsRepository.deleteAll(checkParameter.getCheckParameterOptions());
        checkParameter.getCheckParameterOptions().clear();
        saveOptions(checkParameter, request.allowedOptions(), true);
        saveOptions(checkParameter, request.notAllowedOptions(), false);
        checkParameterRepository.save(checkParameter);
        audit(BatchAuditAction.UPDATED, oldData, checkParameterMapper.copy(checkParameter));
    }

    @Override
    @Transactional
    public void delete(Long id, Long currentUserId) {
        CheckParameter checkParameter = checkParameterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Check parameter not found: " + id));

        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + currentUserId));
        audit(BatchAuditAction.DELETED, checkParameterMapper.copy(checkParameter), null);
        checkParameter.setDeleted(true);
        checkParameter.setDeletedAt(LocalDateTime.now());
        checkParameter.setDeletedBy(user);
        checkParameterRepository.save(checkParameter);
    }

    @Override
    public List<CheckParameterResponse> getAll() {
        return checkParameterRepository.findAllByDeletedFalseOrderByNameAsc()
                .stream()
                .map(checkParameterMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CheckParameterResponse getById(Long id) {
        CheckParameter checkParameter = checkParameterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Check parameter not found: " + id));

        return checkParameterMapper.toResponse(checkParameter);
    }

    private Material getFinishedProduct(String product) {

        Material material = materialRepository.findByNameIgnoreCaseAndDeletedFalse(product)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + product));
        if (material.getMaterialType() != MaterialType.FINISHED_PRODUCT) {
            throw new ResourceNotFoundException("Product is not a finished product: " + product);
        }
        return material;
    }

    private void saveOptions(CheckParameter checkParameter, List<String> options, boolean allowed) {
        if (options == null) {
            return;
        }
        for (String value : options) {
            if (value == null || value.isBlank()) {
                continue;
            }
            CheckParameterOptions option = CheckParameterOptions.builder()
                    .checkParameter(checkParameter)
                    .value(value)
                    .isAllowed(allowed)
                    .build();

            checkParameterOptionsRepository.save(option);
            checkParameter
                    .getCheckParameterOptions()
                    .add(option);
        }
    }

    private void audit(
            BatchAuditAction action,
            CheckParameterAudit oldData,
            CheckParameterAudit newData) {

        batchAuditService.save(
                BatchAuditRequest.builder()
                        .entity(EntityType.CHECK_PARAMETER)
                        .module(ModuleType.SAMPLE_CHECK)
                        .action(action)
                        .oldData(oldData)
                        .newData(newData)
                        .build());
    }
}