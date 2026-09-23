package com.supertech.superbatch.batch.batch.service.impl;

import com.supertech.superbatch.batch.batch_sop.mapper.BatchSOPMapper;
import com.supertech.superbatch.batch.batch_sop.repository.BatchSOPRepository;
import com.supertech.superbatch.batch.batch_sop_material.entity.BatchSOPMaterial;
import com.supertech.superbatch.batch.batch_sop_parameter.entity.BatchSOPParameter;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
import com.supertech.superbatch.batch.batch.dto.MaterialRequest;
import com.supertech.superbatch.batch.batch.dto.MaterialResponse;
import com.supertech.superbatch.batch.batch.dto.ParameterRequest;
import com.supertech.superbatch.batch.batch.dto.ParameterResponse;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.dto.StepChangeRequest;
import com.supertech.superbatch.batch.batch.dto.StepResponse;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch.enums.StepChangeDirection;
import com.supertech.superbatch.batch.batch.mapper.BatchMapper;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.batch.batch.service.BatchService;
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

        @Override
        @Transactional
        public void start(String batchNo) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found:" + batchNo));
                if (batch.getStatus() != BatchStatus.READY) {
                        throw new BadRequestException("Batch is not ready to start");

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
        public void pause(String batchNo, Integer stepNo, String remark) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));

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
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));
                if (batch.getStatus() != BatchStatus.PAUSED) {
                        throw new RuntimeException("Batch is not paused");
                }

                BatchSOP step = batch.getSops().stream()
                                .filter(sop -> sop.getStepNo().equals(stepNo))
                                .findFirst()
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Step " + stepNo + " not found for batch: " + batchNo));
                step.setStartDateTime(LocalDateTime.now());
                batch.setStatus(BatchStatus.IN_PROGRESS);
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void abort(String batchNo, Integer stepNo, String remark) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));
                if (batch.getStatus() == BatchStatus.COMPLETED || batch.getStatus() == BatchStatus.ABORTED) {
                        throw new RuntimeException("Batch cannot be aborted from current status: " + batch.getStatus());
                }
                remark(batchNo, stepNo, remark);
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
        public void remark(String batchNo, Integer stepNo, String remark) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found: " + batchNo));

                BatchSOP step = batch.getSops().stream()
                                .filter(sop -> sop.getStepNo().equals(stepNo))
                                .findFirst()
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Step " + stepNo + " not found for batch: " + batchNo));

                step.setRemark(remark);
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
                                                        .fromEquipmentId(sop.getFromEquipment() != null
                                                                        ? sop.getFromEquipment().getId()
                                                                        : null)
                                                        .fromEquipmentName(sop.getFromEquipment() != null
                                                                        ? sop.getFromEquipment().getName()
                                                                        : null)
                                                        .toEquipmentId(sop.getToEquipment() != null
                                                                        ? sop.getToEquipment().getId()
                                                                        : null)
                                                        .toEquipmentName(sop.getToEquipment() != null
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
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found:" + batchNo));
                if (batch.getStatus() != BatchStatus.TRANSFERRED) {
                        throw new BadRequestException("Batch is not transferred to download.");

                }
                batch.setStatus(BatchStatus.READY);
                batchRepository.save(batch);
        }

        @Override
        @Transactional
        public void onStepChange(String batchNo, StepChangeRequest req) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));
                BatchSOP step = batch.getSops().stream()
                                .filter(sop -> sop.getStepNo().equals(req.stepNo()))
                                .findFirst()
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                LocalDateTime now = LocalDateTime.now();

                if (req.direction() == StepChangeDirection.NEXT) {
                        if (step.getTransition().getName().equals(TransitionType.AUTO_MATERIAL_CHARGE.getDisplayName())
                                        || step.getTransition().getName().equals(
                                                        TransitionType.MANUAL_MATERIAL_CHARGE.getDisplayName())) {

                                if (req.materialRequests() == null || req.materialRequests().isEmpty()) {
                                        throw new BadRequestException(
                                                        "Material Qty is required in Transition criteria auto material charge and manual material charge.");
                                }
                        }
                        for (BatchSOPMaterial material : step.getMaterials()) {
                                MaterialRequest request = req.materialRequests().stream()
                                                .filter(item -> material.getMaterial().getId()
                                                                .equals(item.materialId()))
                                                .findFirst()
                                                .orElse(null);

                                material.setActQty(request != null ? request.actQty() : 0.0);
                        }

                        List<ParameterRequest> parameterRequests = req.parameterRequests() != null
                                        ? req.parameterRequests()
                                        : List.of();

                        Set<Long> stepParameterIds = step.getParameters().stream()
                                        .map(parameter -> parameter.getParameter().getId())
                                        .collect(Collectors.toSet());

                        // Validate that supplied parameters belong to this step
                        for (ParameterRequest request : parameterRequests) {
                                if (!stepParameterIds.contains(request.parameterId())) {
                                        throw new BadRequestException("Parameter does not belong to this step: "
                                                        + request.parameterId());
                                }
                        }

                        // Validate that every step parameter was provided
                        for (BatchSOPParameter parameter : step.getParameters()) {

                                ParameterRequest request = parameterRequests.stream()
                                                .filter(item -> parameter.getParameter().getId()
                                                                .equals(item.parameterId()))
                                                .findFirst()
                                                .orElseThrow(() -> new BadRequestException(
                                                                "Parameter is required for this step: "
                                                                                + parameter.getParameter().getName()));

                                parameter.setActValue(request.actValue());
                        }
                        step.setEndDateTime(now);
                        if (step.getStartDateTime() != null) {
                                step.setActTime(Duration.between(step.getStartDateTime(), now).toMillis() / 60000.0);
                        }

                        // Check for end step
                        if (step.getTransition().getName().equals(TransitionType.RELEASE_EQUIPMENT.getDisplayName())) {
                                batch.setEndDateTime(now);
                                batch.setStatus(BatchStatus.COMPLETED);

                        } else {
                                BatchSOP nextStep = batch.getSops().stream()
                                                .filter(sop -> sop.getStepNo().equals(req.stepNo() + 1))
                                                .findFirst()
                                                .orElseThrow(() -> new ResourceNotFoundException(
                                                                "Step not found."));

                                nextStep.setStartDateTime(now);
                        }
                        batchRepository.save(batch);
                }

        }

}
