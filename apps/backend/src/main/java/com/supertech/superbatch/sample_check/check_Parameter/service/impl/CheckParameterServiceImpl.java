package com.supertech.superbatch.sample_check.check_Parameter.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.enums.MaterialType;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterRequest;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterResponse;
import com.supertech.superbatch.sample_check.check_Parameter.entity.CheckParameter;
import com.supertech.superbatch.sample_check.check_Parameter.mapper.CheckParameterMapper;
import com.supertech.superbatch.sample_check.check_Parameter.repository.CheckParameterRepository;
import com.supertech.superbatch.sample_check.check_Parameter.service.CheckParameterService;
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
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void create(CheckParameterRequest request) {
        Material material = getFinishedProduct(request.product());
        CheckParameter checkParameter = checkParameterMapper.toEntity(request, material);
        CheckParameter saved = checkParameterRepository.save(checkParameter);
        saveOptions(saved, request.allowedOptions(), true);
        saveOptions(saved, request.notAllowedOptions(), false);
    }

    @Override
    @Transactional
    public void update(Long id, CheckParameterRequest request) {
        CheckParameter checkParameter = checkParameterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Check parameter not found: " + id));

        Material material = getFinishedProduct(request.product());
        checkParameterMapper.updateEntity(checkParameter, request, material);
        checkParameterOptionsRepository.deleteAll(checkParameter.getCheckParameterOptions());
        checkParameter.getCheckParameterOptions().clear();
        saveOptions(checkParameter, request.allowedOptions(), true);
        saveOptions(checkParameter, request.notAllowedOptions(), false);
        checkParameterRepository.save(checkParameter);
    }

    @Override
    @Transactional
    public void delete(Long id, Long currentUserId) {
        CheckParameter checkParameter = checkParameterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Check parameter not found: " + id));

        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + currentUserId));
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
}