package com.supertech.superbatch.batch.batch.service.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.batch.batch.dto.BatchAuditData;
import com.supertech.superbatch.batch.batch.dto.StepChangeRequest;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch.enums.StepChangeDirection;
import com.supertech.superbatch.batch.batch.enums.StepChangeMode;
import com.supertech.superbatch.batch.batch.helper.BatchExecutionHelper;
import com.supertech.superbatch.batch.batch.mapper.BatchMapper;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.batch.batch.service.BatchExecutionService;
import com.supertech.superbatch.batch.batch.validation.BatchValidator;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop.enums.BatchSOPStatus;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.plant.transition.enums.TransitionType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@RequiresLicense
public class BatchExecutionServiceImpl implements BatchExecutionService {
    private final BatchRepository batchRepository;
    private final BatchMapper batchMapper;
    private final BatchValidator batchValidator;
    private final BatchAuditService batchAuditService;
    private final BatchExecutionHelper batchExecutionHelper;

    @Override
    @Transactional
    @RequiresPermission(ModuleType.BATCH)
    public void start(String batchNo) {
        Batch batch = getBatchByBatchNo(batchNo);
        if (batch.getStatus() != BatchStatus.READY) {
            throw new BadRequestException("Batch is not ready to start");
        }
        BatchAuditData oldData = batchMapper.copy(batch);

        LocalDateTime now = LocalDateTime.now();

        batch.setStatus(BatchStatus.IN_PROGRESS);
        batch.setStartDateTime(now);

        BatchSOP firstStep = getStep(batch, 1, batchNo);
        firstStep.setStartDateTime(now);
        firstStep.setStatus(BatchSOPStatus.IN_PROGRESS);

        batchRepository.save(batch);
        BatchAuditData newData = batchMapper.copy(batch);
        audit(BatchAuditAction.BATCH_START, oldData, newData);
    }

    @Override
    @Transactional
    @RequiresPermission(ModuleType.BATCH)
    public void pause(String batchNo, Integer stepNo, String remark) {
        Batch batch = getBatchByBatchNo(batchNo);
        if (batch.getStatus() != BatchStatus.IN_PROGRESS) {
            throw new BadRequestException("Only an in-progress batch can be paused");
        }
        BatchSOP currentStep = getStep(batch, stepNo, batchNo);

        BatchAuditData oldData = batchMapper.copy(batch);
        remark(batchNo, stepNo, remark);

        LocalDateTime now = LocalDateTime.now();
        batchExecutionHelper.completeStepTiming(currentStep, now);
        currentStep.setStatus(BatchSOPStatus.PAUSED);
        batch.setStatus(BatchStatus.PAUSED);
        batchRepository.save(batch);
        BatchAuditData newData = batchMapper.copy(batch);
        audit(BatchAuditAction.BATCH_PAUSE, oldData, newData);
    }

    @Override
    @Transactional
    @RequiresPermission(ModuleType.BATCH)
    public void resume(String batchNo, Integer stepNo) {
        Batch batch = getBatchByBatchNo(batchNo);
        if (batch.getStatus() != BatchStatus.PAUSED) {
            throw new BadRequestException("Batch is not paused");
        }
        BatchSOP currentStep = getStep(batch, stepNo, batchNo);
        if (currentStep.getStatus() != BatchSOPStatus.PAUSED) {
            throw new BadRequestException("Step is not paused");
        }

        BatchAuditData oldData = batchMapper.copy(batch);
        LocalDateTime now = LocalDateTime.now();

        currentStep.setStartDateTime(now);
        currentStep.setStatus(BatchSOPStatus.IN_PROGRESS);
        batch.setStatus(BatchStatus.IN_PROGRESS);

        batchRepository.save(batch);

        BatchAuditData newData = batchMapper.copy(batch);
        audit(BatchAuditAction.BATCH_RESUME, oldData, newData);
    }

    @Override
    @Transactional
    @RequiresPermission(anyOf = { ModuleType.MANAGER, ModuleType.BATCH })
    public void abort(String batchNo, Integer stepNo, String remark) {
        Batch batch = getBatchByBatchNo(batchNo);

        if (batch.getStatus() == BatchStatus.COMPLETED
                || batch.getStatus() == BatchStatus.ABORTED) {
            throw new BadRequestException(
                    "Batch cannot be aborted from current status: " + batch.getStatus());
        }

        BatchSOP currentStep = getStep(batch, stepNo, batchNo);

        BatchAuditData oldData = batchMapper.copy(batch);
        LocalDateTime now = LocalDateTime.now();

        remark(batchNo, stepNo, remark);

        if (currentStep.getStatus() == BatchSOPStatus.IN_PROGRESS) {
            batchExecutionHelper.completeStepTiming(currentStep, now);
        }

        currentStep.setStatus(BatchSOPStatus.ABORTED);
        currentStep.setEndDateTime(now);
        batch.setStatus(BatchStatus.ABORTED);
        batch.setEndDateTime(now);
        batchRepository.save(batch);

        BatchAuditData newData = batchMapper.copy(batch);
        audit(BatchAuditAction.BATCH_ABORT, oldData, newData);
    }

    @Override
    @Transactional
    @RequiresPermission(anyOf = { ModuleType.MANAGER, ModuleType.BATCH })
    public void remark(String batchNo, Integer stepNo, String remark) {
        Batch batch = getBatchByBatchNo(batchNo);
        BatchSOP step = getStep(batch, stepNo, batchNo);
        step.setRemark(remark);
        batchRepository.save(batch);
    }

    @Override
    @Transactional
    @RequiresPermission(ModuleType.BATCH)
    public void download(String batchNo) {
        Batch batch = getBatchByBatchNo(batchNo);
        if (batch.getStatus() != BatchStatus.TRANSFERRED) {
            throw new BadRequestException("Batch is not transferred to download.");
        }
        BatchAuditData oldData = batchMapper.copy(batch);
        batch.setStatus(BatchStatus.READY);
        batchRepository.save(batch);
        BatchAuditData newData = batchMapper.copy(batch);
        audit(BatchAuditAction.BATCH_READY, oldData, newData);
    }

    @Override
    @Transactional
    @RequiresPermission(ModuleType.BATCH)
    public void onStepChange(String batchNo, StepChangeRequest req) {

        Batch batch = getBatchByBatchNo(batchNo);

        if (batch.getStatus() != BatchStatus.IN_PROGRESS) {
            throw new BadRequestException("Batch is not in progress");
        }

        BatchSOP step = getStep(batch, req.stepNo(), batchNo);

        if (req.direction() != StepChangeDirection.NEXT) {
            return;
        }

        BatchAuditData oldData = batchMapper.copy(batch);
        LocalDateTime now = LocalDateTime.now();

        boolean isReleaseEquipment = step.getTransition() != null
                && TransitionType.RELEASE_EQUIPMENT.getDisplayName()
                        .equals(step.getTransition().getName());

        if (req.stepChangeMode() == StepChangeMode.AUTO) {
            batchValidator.validateMaterialRequests(step, req.materialRequests());
            batchValidator.validateParameters(step, req.parameterRequests());
            batchExecutionHelper.updateMaterialQuantities(step, req.materialRequests());
            batchExecutionHelper.updateParameterValues(step, req.parameterRequests());
            batchExecutionHelper.completeStepTiming(step, now);
            step.setEndDateTime(now);
            step.setStatus(BatchSOPStatus.COMPLETED);

            if (isReleaseEquipment) {

                batch.setEndDateTime(now);
                batch.setStatus(BatchStatus.COMPLETED);

            } else {

                BatchSOP nextStep = getStep(batch, req.stepNo() + 1, batchNo);

                if (nextStep.getStatus() != BatchSOPStatus.COMPLETED) {
                    setStepInProgress(batch, nextStep, now);
                }
            }

        } else if (req.stepChangeMode() == StepChangeMode.MANUAL) {

            if (isReleaseEquipment) {

                batchExecutionHelper.completeStepTiming(step, now);
                step.setEndDateTime(now);
                step.setStatus(BatchSOPStatus.COMPLETED);

                batch.setEndDateTime(now);
                batch.setStatus(BatchStatus.COMPLETED);

            } else {

                if (step.getStatus() != BatchSOPStatus.COMPLETED) {
                    batchExecutionHelper.completeStepTiming(step, now);
                    step.setEndDateTime(now);
                    step.setStatus(BatchSOPStatus.SKIPPED);
                    
                }

                BatchSOP nextStep = getStep(batch, req.stepNo() + 1, batchNo);

                if (nextStep.getStatus() != BatchSOPStatus.COMPLETED) {
                    setStepInProgress(batch, nextStep, now);
                }
            }
        }

        batchRepository.save(batch);

        if (batch.getStatus() == BatchStatus.COMPLETED) {
            BatchAuditData newData = batchMapper.copy(batch);
            audit(BatchAuditAction.BATCH_COMPLETE, oldData, newData);
        }
    }

    private void setStepInProgress(Batch batch,BatchSOP targetStep,LocalDateTime now) {
        // Skip any other step currently in progress.
        for (BatchSOP otherStep : batch.getSops()) {

            if (otherStep != targetStep
                    && otherStep.getStatus() == BatchSOPStatus.IN_PROGRESS) {

                batchExecutionHelper.completeStepTiming(otherStep, now);
                otherStep.setEndDateTime(now);
                otherStep.setStatus(BatchSOPStatus.SKIPPED);
            }
        }

        if (targetStep.getStatus() == BatchSOPStatus.COMPLETED) {
            return;
        }

        if (targetStep.getStartDateTime() == null) {
            targetStep.setStartDateTime(now);
        }

        targetStep.setStatus(BatchSOPStatus.IN_PROGRESS);
    }

    private Batch getBatchByBatchNo(String batchNo) {
        Batch batch = batchRepository.findByBatchNo(batchNo)
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));
        return batch;
    }

    private BatchSOP getStep(Batch batch, Integer stepNo, String batchNo) {
        return batch.getSops().stream()
                .filter(sop -> sop.getStepNo().equals(stepNo))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Step " + stepNo + " not found for batch: " + batchNo));
    }

    private void audit(BatchAuditAction action, BatchAuditData oldData, BatchAuditData newData) {
        batchAuditService.save(
                BatchAuditRequest.builder()
                        .entity(EntityType.BATCH)
                        .module(ModuleType.BATCH)
                        .action(action)
                        .oldData(oldData)
                        .newData(newData)
                        .build());
    }

}
