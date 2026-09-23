package com.supertech.superbatch.sample_check.material_correction.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.sample_check.material_correction.dto.MaterialCorrectionResponse;
import com.supertech.superbatch.sample_check.material_correction.entity.MaterialCorrection;

@Component
public class MaterialCorrectionMapper {
    public MaterialCorrectionResponse toResponse(MaterialCorrection materialCorrection) {
        return MaterialCorrectionResponse.builder()
                .id(materialCorrection.getId())
                .batchNo(materialCorrection.getBatch().getBatchNo())
                .stepNo(materialCorrection.getBatchSOP().getStepNo())
                .sampleDateTime(materialCorrection.getSampleDateTime())
                .materialId(materialCorrection.getMaterial().getId())
                .materialName(materialCorrection.getMaterial().getName())
                .materialCode(materialCorrection.getMaterial().getCode())
                .qty(materialCorrection.getQty())
                .build();
    }

    public MaterialCorrection toEntity(Batch batch, BatchSOP batchSOP, Material material, Double qty) {
        return MaterialCorrection
                .builder()
                .batch(batch)
                .batchSOP(batchSOP)
                .sampleDateTime(LocalDateTime.now())
                .material(material)
                .qty(qty)
                .build();
    }
}
