package com.supertech.superbatch.batch.batch_sop.mapper;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.dto.BatchSOPMaterialResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPParameterResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
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

        public BatchSOPResponse toResponse(BatchSOP batchSOP) {
              List<BatchSOPMaterialResponse> materials = batchSOP.getMaterials().stream()
                        .map(material -> BatchSOPMaterialResponse.builder()
                                .id(material.getId())
                                .materialId(material.getMaterial().getId())
                                .materialName(material.getMaterial().getName())
                                .stdQty(material.getStdQty())
                                .actQty(material.getActQty())
                                .build())
                        .sorted(Comparator.comparing(
                                BatchSOPMaterialResponse::materialName,
                                String.CASE_INSENSITIVE_ORDER))
                        .toList();

                List<BatchSOPParameterResponse> parameters = batchSOP.getParameters().stream()
                        .map(parameter -> BatchSOPParameterResponse.builder()
                                .id(parameter.getId())
                                .parameterId(parameter.getParameter().getId())
                                .parameterName(parameter.getParameter().getName())
                                .stdValue(parameter.getStdValue())
                                .actValue(parameter.getActValue())
                                .build())
                        .sorted(Comparator.comparing(
                                BatchSOPParameterResponse::parameterName,
                                String.CASE_INSENSITIVE_ORDER))
                        .toList();

                return BatchSOPResponse.builder()
                                .id(batchSOP.getId())
                                .batchId(batchSOP.getBatch().getId())
                                .stepNo(batchSOP.getStepNo())
                                .stdTime(batchSOP.getStdTime())
                                .actTime(batchSOP.getActTime())
                                .transitionId(batchSOP.getTransition().getId())
                                .transitionName(batchSOP.getTransition().getName())
                                .actionId(batchSOP.getAction().getId())
                                .actionName(batchSOP.getAction().getName())
                                .message(batchSOP.getMessage())
                                .fromEquipmentId(batchSOP.getFromEquipment() != null
                                                ? batchSOP.getFromEquipment().getId()
                                                : null)
                                .fromEquipmentName(batchSOP.getFromEquipment() != null
                                                ? batchSOP.getFromEquipment().getName()
                                                : null)
                                .fromEquipmentCode(batchSOP.getFromEquipment() != null
                                                ? batchSOP.getFromEquipment().getCode()
                                                : null)
                                .toEquipmentId(batchSOP.getToEquipment() != null ? batchSOP.getToEquipment().getId()
                                                : null)
                                .toEquipmentName(batchSOP.getToEquipment() != null ? batchSOP.getToEquipment().getName()
                                                : null)
                                .toEquipmentCode(batchSOP.getToEquipment() != null ? batchSOP.getToEquipment().getCode()
                                                : null)
                                .startDateTime(batchSOP.getStartDateTime())
                                .endDateTime(batchSOP.getEndDateTime())
                                .status(batchSOP.getStatus())
                                .remark(batchSOP.getRemark())
                                .materials(materials)
                                .parameters(parameters)
                                .build();
        }
}