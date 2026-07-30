package com.supertech.superbatch.batch.batch_sop_parameter.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop_parameter.entity.BatchSOPParameter;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;

@Component
public class BatchSOPParameterMapper {
    public BatchSOPParameter toEntity(ControlRecipeSOPParameter controlRecipeSOPParameter, BatchSOP batchSOP) {

        return BatchSOPParameter.builder()
                .batchSOP(batchSOP)
                .parameter(controlRecipeSOPParameter.getParameter())
                .stdValue(controlRecipeSOPParameter.getStdValue())
                .build();
    }
}
