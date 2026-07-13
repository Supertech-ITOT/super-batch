package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

public record RecipeSOPSummaryResponse(Integer totalSteps,
        Integer totalMaterials,
        Double totalDuration,
        List<RecipeSOPMaterialSummaryResponse> materials) {

}
