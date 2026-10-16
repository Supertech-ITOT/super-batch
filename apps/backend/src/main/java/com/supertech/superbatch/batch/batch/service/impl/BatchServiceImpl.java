package com.supertech.superbatch.batch.batch.service.impl;

import com.supertech.superbatch.batch.batch_sop.mapper.BatchSOPMapper;
import com.supertech.superbatch.batch.batch_sop.repository.BatchSOPRepository;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.supertech.superbatch.batch.batch.dto.BatchAbortResponse;
import com.supertech.superbatch.batch.batch.dto.BatchInfoResponse;
import com.supertech.superbatch.batch.batch.dto.BatchProgressResponse;
import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch.mapper.BatchMapper;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.batch.batch.service.BatchService;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop.enums.BatchSOPStatus;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@RequiresLicense
@Transactional(readOnly = true)
public class BatchServiceImpl implements BatchService {
        private final BatchSOPMapper batchSOPMapper;
        private final BatchRepository batchRepository;
        private final BatchMapper batchMapper;
        private final BatchSOPRepository batchSOPRepository;

        @Override
        public BatchResponse getByBatchNo(String batchNo) {
                Batch batch = getBatchByBatchNo(batchNo);
                List<BatchSOPResponse> steps = batch.getSops().stream().map(batchSOPMapper::toResponse).toList();
                return BatchResponse.builder().steps(steps).build();
        }

        @Override
        public BatchResponse getById(Long id) {
                Batch batch = batchRepository.findByIdWithRelation(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));
                List<BatchSOPResponse> steps = batch.getSops().stream().map(batchSOPMapper::toResponse).toList();
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
        public BatchAbortResponse getAbortDetails(Long batchId) {
                Batch batch = batchRepository.findForAbortById(batchId).orElseThrow(
                                () -> new ResourceNotFoundException("Batch not found with id: " + batchId));
                return batchMapper.toBatchAbortResponse(batch);
        }

        private Batch getBatchByBatchNo(String batchNo) {
                Batch batch = batchRepository.findByBatchNo(batchNo)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));
                return batch;
        }

        @Override
        public BatchInfoResponse getBatchInfoById(Long id) {
                Batch batch = batchRepository.findByIdWithRelation(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));
                return batchMapper.toBatchInfoResponse(batch);
        }

        @Override
        public BatchProgressResponse getBatchProgressById(Long id) {
                Batch batch = batchRepository.findByIdWithRelation(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));

                Set<BatchSOP> sops = batch.getSops();
                int totalStep = sops.size();
                int completedStep = (int) sops.stream()
                                .filter(sop -> sop.getStatus() == BatchSOPStatus.COMPLETED)
                                .count();
                int currentStep = sops.stream()
                                .filter(sop -> sop.getStatus() == BatchSOPStatus.IN_PROGRESS)
                                .map(BatchSOP::getStepNo)
                                .min(Integer::compareTo)
                                .orElse(0);
                int pendingStep = (int) sops.stream()
                                .filter(sop -> sop.getStatus() == BatchSOPStatus.PENDING)
                                .count();
                int skippedStep = (int) sops.stream()
                                .filter(sop -> sop.getStatus() == BatchSOPStatus.SKIPPED)
                                .count();
                int progress = totalStep == 0 ? 0 : (int) Math.round((completedStep * 100.0) / totalStep);

                return BatchProgressResponse.builder()
                                .progress(progress)
                                .totalStep(totalStep)
                                .completedStep(completedStep)
                                .currentStep(currentStep)
                                .pendingStep(pendingStep)
                                .skippedStep(skippedStep)
                                .build();
        }

        @Override
        public BatchSOPResponse getCurrentStepInfoById(Long id) {
                Batch batch = batchRepository.findByIdWithRelation(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));
                BatchSOP batchSOP = batch.getSops()
                                .stream()
                                .filter(sop -> sop.getStatus() == BatchSOPStatus.IN_PROGRESS)
                                .findFirst()
                                .orElse(null);
                return batchSOPMapper.toResponse(batchSOP);
        }

}
