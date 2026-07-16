package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.plant.common.dto.UomResponse;

public record RecipeSOPSummaryResponse(
                Integer batchSize,
                UomResponse batchSizeUom,
                Integer totalSteps,
                Integer totalMaterials,
                Double totalDuration,
                List<RecipeSOPMaterialSummaryResponse> materials) {

}
