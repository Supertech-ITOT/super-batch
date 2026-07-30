package com.supertech.superbatch.batch.batch_sop_material.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop_material.entity.BatchSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;

@Component
public class BatchSOPMaterialMapper {

    public BatchSOPMaterial toEntity(ControlRecipeSOPMaterial controlRecipeSOPMaterial, BatchSOP batchSOP) {

        return BatchSOPMaterial.builder()
                .batchSOP(batchSOP)
                .material(controlRecipeSOPMaterial.getMaterial())
                .stdQty(controlRecipeSOPMaterial.getStdQty())
                .build();
    }

}
