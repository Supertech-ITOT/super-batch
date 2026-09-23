package com.supertech.superbatch.sample_check.material_correction.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop.repository.BatchSOPRepository;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.transition.enums.TransitionType;
import com.supertech.superbatch.sample_check.material_correction.dto.MaterialCorrectionRequest;
import com.supertech.superbatch.sample_check.material_correction.dto.MaterialCorrectionResponse;
import com.supertech.superbatch.sample_check.material_correction.entity.MaterialCorrection;
import com.supertech.superbatch.sample_check.material_correction.mapper.MaterialCorrectionMapper;
import com.supertech.superbatch.sample_check.material_correction.repository.MaterialCorrectionRepository;
import com.supertech.superbatch.sample_check.material_correction.service.MaterialCorrectionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MaterialCorrectionServiceImpl implements MaterialCorrectionService {
        private final MaterialCorrectionRepository materialCorrectionRepository;
        private final BatchRepository batchRepository;
        private final BatchSOPRepository batchSOPRepository;
        private final MaterialRepository materialRepository;
        private final MaterialCorrectionMapper materialCorrectionMapper;

        @Override
        @Transactional
        public void create(MaterialCorrectionRequest request) {
                Batch batch = batchRepository.findByBatchNo(request.batchNo())
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));

                BatchSOP batchSOP = batchSOPRepository
                                .findByBatch_BatchNoAndStepNo(request.batchNo(), request.stepNo())
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                if (!batchSOP.getTransition().getName().equals(TransitionType.SAMPLE_CHECK.getDisplayName())) {
                        throw new BadRequestException(
                                        "Material Correction cannot be added as it is not a Sample Check Transition.");
                }

                Material material = materialRepository
                                .findByIdAndDeletedFalse(request.materialId())
                                .orElseThrow(() -> new ResourceNotFoundException("Material not found."));

                MaterialCorrection correction = materialCorrectionMapper.toEntity(batch, batchSOP, material,
                                request.qty());
                materialCorrectionRepository.save(correction);
        }

        @Override
        public List<MaterialCorrectionResponse> getByBatchNo(String batchNo) {
                return materialCorrectionRepository
                                .findByBatch_BatchNoOrderBySampleDateTimeAsc(batchNo)
                                .stream()
                                .map(materialCorrectionMapper::toResponse)
                                .toList();
        }
}
