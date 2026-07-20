package com.supertech.superbatch.scheduler.controlrecipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.plant.common.dto.UomResponse;

public record ControlRecipeSOPSummaryResponse(
        Integer batchSize,
        UomResponse batchSizeUom,
        Integer totalSteps,
        Integer totalMaterials,
        Double totalDuration,
        List<ControlRecipeSOPMaterialSummaryResponse> materials

) {

}
