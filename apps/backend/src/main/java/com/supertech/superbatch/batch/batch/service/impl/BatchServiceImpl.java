package com.supertech.superbatch.batch.batch.service.impl;

import com.supertech.superbatch.batch.batch_sop.mapper.BatchSOPMapper;
import com.supertech.superbatch.batch.batch_sop.repository.BatchSOPRepository;
import com.supertech.superbatch.batch.batch_sop_material.entity.BatchSOPMaterial;
import com.supertech.superbatch.batch.batch_sop_parameter.entity.BatchSOPParameter;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
import com.supertech.superbatch.batch.batch.dto.MaterialRequest;
import com.supertech.superbatch.batch.batch.dto.ParameterRequest;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.dto.StepChangeRequest;
import com.supertech.superbatch.batch.batch.dto.StepResponse;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch.enums.StepChangeDirection;
import com.supertech.superbatch.batch.batch.mapper.BatchMapper;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.batch.batch.service.BatchService;
import com.supertech.superbatch.batch.batch.validation.BatchValidator;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.plant.transition.enums.TransitionType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@RequiresLicense
public class BatchServiceImpl implements BatchService {
        private final BatchSOPMapper batchSOPMapper;
        private final BatchRepository batchRepository;
        private final BatchMapper batchMapper;
        private final BatchSOPRepository batchSOPRepository;
        private final BatchValidator batchValidator;

        @Override
        @Transactional
        public void start(String batchNo) {
                Batch batch = getBatchByBatchNo(batchNo);
                if (batch.getStatus() != BatchStatus.READY) {
                        throw new BadRequestException("Batch is not ready to start");
                }
                batch.setStatus(BatchStatus.IN_PROGRESS);
                batch.setStartDateTime(LocalDateTime.now());
                BatchSOP firstStep = getStep(batch, 1, batchNo);
                firstStep.setStartDateTime(LocalDateTime.now());
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void pause(String batchNo, Integer stepNo, String remark) {
                Batch batch = getBatchByBatchNo(batchNo);
                if (batch.getStatus() != BatchStatus.IN_PROGRESS) {
                        throw new BadRequestException("Only an in-progress batch can be paused");
                }
                remark(batchNo, stepNo, remark);
                batch.setStatus(BatchStatus.PAUSED);
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void resume(String batchNo, Integer stepNo) {
                Batch batch = getBatchByBatchNo(batchNo);
                if (batch.getStatus() != BatchStatus.PAUSED) {
                        throw new BadRequestException("Batch is not paused");
                }
                BatchSOP step = getStep(batch, stepNo, batchNo);
                step.setStartDateTime(LocalDateTime.now());
                batch.setStatus(BatchStatus.IN_PROGRESS);
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void abort(String batchNo, Integer stepNo, String remark) {
                Batch batch = getBatchByBatchNo(batchNo);
                if (batch.getStatus() == BatchStatus.COMPLETED || batch.getStatus() == BatchStatus.ABORTED) {
                        throw new BadRequestException(
                                        "Batch cannot be aborted from current status: " + batch.getStatus());
                }
                remark(batchNo, stepNo, remark);
                batch.setStatus(BatchStatus.ABORTED);
                batch.setEndDateTime(LocalDateTime.now());
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void remark(String batchNo, Integer stepNo, String remark) {
                Batch batch = getBatchByBatchNo(batchNo);
                BatchSOP step = getStep(batch, stepNo, batchNo);
                step.setRemark(remark);
                batchRepository.save(batch);
        }

        @Override
        @Transactional(readOnly = true)
        public BatchResponse getByBatchNo(String batchNo) {
                Batch batch = getBatchByBatchNo(batchNo);
                List<StepResponse> steps = batch.getSops()
                                .stream()
                                .map(batchMapper::toStepResponse)
                                .toList();
                return BatchResponse.builder().steps(steps).build();
        }

        @Override
        public RecipeInfoResponse getRecipeInfoByBatchNo(String batchNo) {
                Batch batch = batchRepository.findWithRecipeInfoByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));
                if (batch.getControlRecipe() == null) {
                        throw new ResourceNotFoundException("Control recipe not found for batch: " + batchNo);
                }
                return batchMapper.toRecipeInfoResponse(batch);
        }

        @Override
        public BatchSOPResponse getStepInfoByBatchNoAndStepNo(String batchNo, Integer stepNo) {
                BatchSOP batchSOP = batchSOPRepository.findByBatch_BatchNoAndStepNo(batchNo, stepNo).orElseThrow(
                                () -> new ResourceNotFoundException("Step not found for batch: " + batchNo));
                return batchSOPMapper.toResponse(batchSOP);
        }

        @Override
        public List<String> getBatchNos(String unitCode, BatchStatus status) {
                return batchRepository.findByUnit_CodeAndStatusOrderByCreatedAtDesc(unitCode, status).stream()
                                .map(Batch::getBatchNo).toList();
        }

        @Override
        @Transactional
        public void download(String batchNo) {
                Batch batch = getBatchByBatchNo(batchNo);
                if (batch.getStatus() != BatchStatus.TRANSFERRED) {
                        throw new BadRequestException("Batch is not transferred to download.");
                }
                batch.setStatus(BatchStatus.READY);
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void onStepChange(String batchNo, StepChangeRequest req) {
                if (req.direction() == StepChangeDirection.NEXT) {
                        Batch batch = getBatchByBatchNo(batchNo);
                        BatchSOP step = getStep(batch, req.stepNo(), batchNo);
                        LocalDateTime now = LocalDateTime.now();

                        batchValidator.validateMaterialRequests(step, req.materialRequests());
                        batchValidator.validateParameters(step, req.parameterRequests());

                        updateMaterialQuantities(step, req.materialRequests());
                        updateParameterValues(step, req.parameterRequests());

                        step.setEndDateTime(now);
                        if (step.getStartDateTime() != null) {
                                step.setActTime(Duration.between(step.getStartDateTime(), now).toMillis() / 60000.0);
                        }

                        // Check for end step
                        if (step.getTransition().getName().equals(TransitionType.RELEASE_EQUIPMENT.getDisplayName())) {
                                batch.setEndDateTime(now);
                                batch.setStatus(BatchStatus.COMPLETED);

                        } else {
                                BatchSOP nextStep = getStep(batch, req.stepNo() + 1, batchNo);
                                nextStep.setStartDateTime(now);
                        }
                        batchRepository.save(batch);
                }

        }

        private void updateMaterialQuantities(BatchSOP step, List<MaterialRequest> materialRequests) {
                List<MaterialRequest> requests = materialRequests != null ? materialRequests : List.of();
                Map<Long, MaterialRequest> requestMap = requests.stream()
                                .collect(Collectors.toMap(MaterialRequest::materialId, Function.identity()));

                for (BatchSOPMaterial material : step.getMaterials()) {
                        MaterialRequest request = requestMap.get(material.getMaterial().getId());
                        material.setActQty(request != null ? request.actQty() : 0.0);
                }
        }

        private void updateParameterValues(BatchSOP step, List<ParameterRequest> parameterRequests) {
                List<ParameterRequest> requests = parameterRequests != null ? parameterRequests : List.of();
                Map<Long, ParameterRequest> requestMap = requests.stream()
                                .collect(Collectors.toMap(ParameterRequest::parameterId, Function.identity()));

                for (BatchSOPParameter parameter : step.getParameters()) {
                        ParameterRequest request = requestMap.get(parameter.getParameter().getId());
                        parameter.setActValue(request != null ? request.actValue() : 0.0);
                }
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

}
