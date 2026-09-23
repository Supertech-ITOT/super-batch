package com.supertech.superbatch.sample_check.batch_check.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop.repository.BatchSOPRepository;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.plant.transition.enums.TransitionType;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckRequest;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckResponse;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckResultRequest;
import com.supertech.superbatch.sample_check.batch_check.entity.BatchCheck;
import com.supertech.superbatch.sample_check.batch_check.mapper.BatchCheckMapper;
import com.supertech.superbatch.sample_check.batch_check.repository.BatchCheckRepository;
import com.supertech.superbatch.sample_check.batch_check.service.BatchCheckService;
import com.supertech.superbatch.sample_check.batch_check_result.entity.BatchCheckResult;
import com.supertech.superbatch.sample_check.batch_check_result.enums.ResultStatus;
import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;
import com.supertech.superbatch.sample_check.check_parameter.enums.CheckParameterType;
import com.supertech.superbatch.sample_check.check_parameter.repository.CheckParameterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@RequiresLicense
@RequiresPermission(ModuleType.SAMPLE_CHECK)
@Transactional(readOnly = true)
public class BatchCheckServiceImpl implements BatchCheckService {

    private final BatchRepository batchRepository;
    private final BatchSOPRepository batchSOPRepository;
    private final CheckParameterRepository checkParameterRepository;
    private final BatchCheckRepository batchCheckRepository;
    private final BatchCheckMapper batchCheckMapper;

    @Override
    @Transactional
    public void create(BatchCheckRequest request) {

        Batch batch = batchRepository.findByBatchNo(request.batchNo())
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));

        BatchSOP batchSOP = batchSOPRepository
                .findByBatch_BatchNoAndStepNo(request.batchNo(), request.stepNo())
                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));

        if (!batchSOP.getTransition().getName().equals(TransitionType.SAMPLE_CHECK.getDisplayName())) {
            throw new BadRequestException("Batch Check cannot be added as it is not a Sample Check Transition.");
        }

        Set<BatchCheckResult> results = new HashSet<>();

        for (BatchCheckResultRequest requestResult : request.results()) {

            CheckParameter checkParameter = checkParameterRepository
                    .findByIdAndDeletedFalse(requestResult.checkParameterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Check Parameter not found."));

            BatchCheckResult result = batchCheckMapper.toEntity(checkParameter, requestResult.value(),
                    calculateResultStatus(checkParameter, requestResult.value()));
            results.add(result);
        }

        BatchCheck batchCheck = batchCheckMapper.toEntity(batch, batchSOP, results);
        results.forEach(result -> result.setBatchCheck(batchCheck));
        batchCheckRepository.save(batchCheck);
    }

    @Override
    public List<BatchCheckResponse> getByBatchNo(String batchNo) {
        return batchCheckRepository
                .findByBatch_BatchNoOrderBySampleDateTimeAsc(batchNo)
                .stream()
                .map(batchCheckMapper::toResponse)
                .toList();
    }

    private ResultStatus calculateResultStatus(CheckParameter parameter, String value) {

        if (parameter.getType() == CheckParameterType.QUALITATIVE) {
            return parameter.getCheckParameterOptions().stream()
                    .anyMatch(option -> option.getValue().equalsIgnoreCase(value) && option.isAllowed())
                            ? ResultStatus.PASS
                            : ResultStatus.FAIL;
        }

        if (parameter.getType() == CheckParameterType.QUANTITATIVE) {
            double actualValue;

            try {
                actualValue = Double.parseDouble(value);
            } catch (NumberFormatException e) {
                return ResultStatus.FAIL;
            }

            if (parameter.getMin() == null || parameter.getMax() == null) {
                return ResultStatus.FAIL;
            }

            return actualValue >= parameter.getMin() && actualValue <= parameter.getMax()
                    ? ResultStatus.PASS
                    : ResultStatus.FAIL;
        }

        return ResultStatus.FAIL;
    }
}