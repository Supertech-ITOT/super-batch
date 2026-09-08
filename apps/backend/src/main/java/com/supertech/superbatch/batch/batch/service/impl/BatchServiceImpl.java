package com.supertech.superbatch.batch.batch.service.impl;

import com.supertech.superbatch.batch.batch_sop.mapper.BatchSOPMapper;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
import com.supertech.superbatch.batch.batch.dto.MaterialResponse;
import com.supertech.superbatch.batch.batch.dto.ParameterResponse;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.dto.StepResponse;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch.mapper.BatchMapper;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.batch.batch.service.BatchService;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.transition.enums.TransitionType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BatchServiceImpl implements BatchService {
        private final BatchSOPMapper batchSOPMapper;
        private final BatchRepository batchRepository;
        private final BatchMapper batchMapper;

        @Override
        @Transactional
        public void start(String batchNo) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found:" + batchNo));
                if (batch.getStatus() != BatchStatus.READY) {
                        throw new RuntimeException("Batch is not ready to start");

                }
                batch.setStatus(BatchStatus.IN_PROGRESS);
                batch.setStartDateTime(LocalDateTime.now());

                BatchSOP firstStep = batch.getSops().stream().findFirst()
                                .orElseThrow(() -> new ResourceNotFoundException("No SOP found for batch: " + batchNo));
                firstStep.setStartDateTime(LocalDateTime.now());
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void pause(String batchNo) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));

                if (batch.getStatus() != BatchStatus.IN_PROGRESS) {
                        throw new RuntimeException("Only an in-progress batch can be paused");
                }
                batch.setStatus(BatchStatus.PAUSED);
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void resume(String batchNo) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));
                if (batch.getStatus() != BatchStatus.PAUSED) {
                        throw new RuntimeException("Batch is not paused");
                }
                batch.setStatus(BatchStatus.IN_PROGRESS);
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void abort(String batchNo) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));
                if (batch.getStatus() == BatchStatus.COMPLETED || batch.getStatus() == BatchStatus.ABORTED) {
                        throw new RuntimeException("Batch cannot be aborted from current status: " + batch.getStatus());
                }
                batch.setStatus(BatchStatus.ABORTED);
                batch.setEndDateTime(LocalDateTime.now());
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void complete(String batchNo, Integer stepNo) {

                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));

                if (batch.getStatus() != BatchStatus.IN_PROGRESS) {
                        throw new BadRequestException("Batch is not in progress");
                }

                BatchSOP step = batch.getSops().stream().filter(sop -> sop.getStepNo().equals(stepNo)).findFirst()
                                .orElseThrow(
                                                () -> new ResourceNotFoundException(
                                                                "Step " + stepNo + " not found for batch: " + batchNo));

                LocalDateTime now = LocalDateTime.now();

                step.setEndDateTime(now);
                if (step.getTransition().getName().equals(TransitionType.RELEASE_EQUIPMENT.getDisplayName())) {
                        batch.setStatus(BatchStatus.COMPLETED);
                        batch.setEndDateTime(now);
                } else {
                        batch.getSops()
                                        .stream()
                                        .filter(sop -> sop.getStepNo() > stepNo)
                                        .findFirst()
                                        .ifPresent(nextStep -> nextStep.setStartDateTime(now));
                }

                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void remark(String batchNo, String remark) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));
                BatchSOP currentStep = batch.getSops().stream()
                                .filter(sop -> sop.getStartDateTime() != null && sop.getEndDateTime() == null)
                                .findFirst()
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "No active step found for batch: " + batchNo));
                currentStep.setRemark(remark);
                batchRepository.save(batch);
        }

        @Override
        @Transactional(readOnly = true)
        public BatchResponse getByBatchNo(String batchNo) {

                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Batch not found: " + batchNo));

                List<StepResponse> steps = batch.getSops()
                                .stream()
                                .map(sop -> {

                                        List<MaterialResponse> materials = sop.getMaterials()
                                                        .stream()
                                                        .map(material -> MaterialResponse.builder()
                                                                        .id(material.getId())
                                                                        .materialId(material.getMaterial().getId())
                                                                        .materialCode(material.getMaterial().getCode())
                                                                        .materialName(material.getMaterial().getName())
                                                                        .stdQty(material.getStdQty())
                                                                        .build())
                                                        .toList();

                                        List<ParameterResponse> parameters = sop.getParameters()
                                                        .stream()
                                                        .map(parameter -> ParameterResponse.builder()
                                                                        .id(parameter.getId())
                                                                        .parameterId(parameter.getParameter().getId())
                                                                        .parameterName(parameter.getParameter()
                                                                                        .getName())
                                                                        .stdValue(parameter.getStdValue())
                                                                        .build())
                                                        .toList();

                                        return StepResponse.builder()
                                                        .stepNo(sop.getStepNo())
                                                        .criteriaId(sop.getTransition().getId())
                                                        .criteriaName(sop.getTransition().getName())
                                                        .actionId(sop.getAction().getId())
                                                        .actionName(sop.getAction().getName())
                                                        .fromEquipmentId(
                                                                        sop.getFromEquipment() != null
                                                                                        ? sop.getFromEquipment().getId()
                                                                                        : null)
                                                        .fromEquipmentName(
                                                                        sop.getFromEquipment() != null
                                                                                        ? sop.getFromEquipment()
                                                                                                        .getName()
                                                                                        : null)
                                                        .toEquipmentId(
                                                                        sop.getToEquipment() != null
                                                                                        ? sop.getToEquipment().getId()
                                                                                        : null)
                                                        .toEquipmentName(
                                                                        sop.getToEquipment() != null
                                                                                        ? sop.getToEquipment().getName()
                                                                                        : null)
                                                        .stdTime(sop.getStdTime())
                                                        .message(sop.getMessage())
                                                        .startDateTime(sop.getStartDateTime())
                                                        .endDateTime(sop.getEndDateTime())
                                                        .materials(materials)
                                                        .parameters(parameters)
                                                        .build();
                                })
                                .toList();

                return BatchResponse.builder()
                                .steps(steps)
                                .build();
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
                BatchSOP batchSOP = batchRepository.findByBatchBatchNoAndStepNo(batchNo, stepNo).orElseThrow(
                                () -> new ResourceNotFoundException("Step not found for batch: " + batchNo));

                return batchSOPMapper.toResponse(batchSOP);
        }

        @Override
        public List<String> getBatchNos(String unitCode, BatchStatus status) {
                return batchRepository.findByUnit_CodeAndStatusOrderByCreatedAtDesc(unitCode, status).stream()
                                .map(Batch::getBatchNo).toList();
        }

}
