package com.supertech.superbatch.batch.batch_sop.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;

@Component
public class BatchSOPMapper {

    public BatchSOP toEntity(ControlRecipeSOP controlRecipeSOP, Batch batch) {

        return BatchSOP.builder()
                .batch(batch)
                .stepNo(controlRecipeSOP.getStepNo())
                .stdTime(controlRecipeSOP.getStdTime())
                .transition(controlRecipeSOP.getTransition())
                .action(controlRecipeSOP.getAction())
                .message(controlRecipeSOP.getMessage())
                .fromEquipment(controlRecipeSOP.getFromEquipment())
                .toEquipment(controlRecipeSOP.getToEquipment())
                .build();
    }
}