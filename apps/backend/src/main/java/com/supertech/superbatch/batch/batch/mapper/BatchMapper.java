package com.supertech.superbatch.batch.batch.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop.mapper.BatchSOPMapper;
import com.supertech.superbatch.batch.batch_sop_material.mapper.BatchSOPMaterialMapper;
import com.supertech.superbatch.batch.batch_sop_parameter.mapper.BatchSOPParameterMapper;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BatchMapper {
    private final BatchSOPMapper batchSOPMapper;
    private final BatchSOPMaterialMapper batchSOPMaterialMapper;
    private final BatchSOPParameterMapper batchSOPParameterMapper;

    public Batch toEntity(ControlRecipe controlRecipe) {
        Batch batch = Batch.builder()
                .batchNo(controlRecipe.getBatchNo())
                .unit(controlRecipe.getUnit())
                .masterRecipe(controlRecipe.getRecipe())
                .controlRecipe(controlRecipe)
                .status(BatchStatus.TRANSFERRED)
                .build();

        for (ControlRecipeSOP controlSop : controlRecipe.getSops()) {
            BatchSOP batchSop = batchSOPMapper.toEntity(controlSop, batch);
            // Materials
            for (ControlRecipeSOPMaterial material : controlSop.getMaterials()) {
                batchSop.getMaterials().add(batchSOPMaterialMapper.toEntity(material, batchSop));
            }
            // Parameters
            for (ControlRecipeSOPParameter parameter : controlSop.getParameters()) {
                batchSop.getParameters().add(batchSOPParameterMapper.toEntity(parameter, batchSop));
            }
            batch.getSops().add(batchSop);
        }
        return batch;
    }
}
