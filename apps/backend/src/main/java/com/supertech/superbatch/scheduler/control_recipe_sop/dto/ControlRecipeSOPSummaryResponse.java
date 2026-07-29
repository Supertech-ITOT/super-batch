package com.supertech.superbatch.scheduler.control_recipe_sop.dto;

import java.util.List;

public record ControlRecipeSOPSummaryResponse(
                Integer batchSize,
                Integer totalSteps,
                Integer totalMaterials,
                Double totalDuration,
                List<ControlRecipeSOPMaterialSummaryResponse> materials

) {

}
