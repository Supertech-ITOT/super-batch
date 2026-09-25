package com.supertech.superbatch.batch.batch.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.dto.MaterialResponse;
import com.supertech.superbatch.batch.batch.dto.ParameterResponse;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.dto.StepResponse;
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

    public RecipeInfoResponse toRecipeInfoResponse(Batch batch) {
        ControlRecipe controlRecipe = batch.getControlRecipe();

        return RecipeInfoResponse.builder()
                .recipeName(controlRecipe.getRecipe().getName())
                .recipeDescription(controlRecipe.getRecipe().getDescription())
                .shiftIncharge(controlRecipe.getShiftIncharge().getName())
                .batchSize(controlRecipe.getBatchSize())
                .scheduledAt(controlRecipe.getScheduledAt())
                .materialCode(controlRecipe.getRecipe().getMaterial().getCode())
                .materialName(controlRecipe.getRecipe().getMaterial().getName())
                .materialDescription(controlRecipe.getRecipe().getMaterial().getDescription())
                .unitCode(controlRecipe.getUnit().getCode())
                .unitName(controlRecipe.getUnit().getName())
                .createdBy(controlRecipe.getCreatedBy().getName())
                .build();

    }

    public StepResponse toStepResponse(BatchSOP sop) {
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
                        .parameterName(parameter.getParameter().getName())
                        .stdValue(parameter.getStdValue())
                        .build())
                .toList();

        return StepResponse.builder()
                .stepNo(sop.getStepNo())
                .criteriaId(sop.getTransition().getId())
                .criteriaName(sop.getTransition().getName())
                .actionId(sop.getAction().getId())
                .actionName(sop.getAction().getName())
                .fromEquipmentId(sop.getFromEquipment() != null ? sop.getFromEquipment().getId() : null)
                .fromEquipmentName(sop.getFromEquipment() != null ? sop.getFromEquipment().getName() : null)
                .toEquipmentId(sop.getToEquipment() != null ? sop.getToEquipment().getId() : null)
                .toEquipmentName(sop.getToEquipment() != null ? sop.getToEquipment().getName() : null)
                .stdTime(sop.getStdTime())
                .message(sop.getMessage())
                .startDateTime(sop.getStartDateTime())
                .endDateTime(sop.getEndDateTime())
                .materials(materials)
                .parameters(parameters)
                .build();
    }

}
