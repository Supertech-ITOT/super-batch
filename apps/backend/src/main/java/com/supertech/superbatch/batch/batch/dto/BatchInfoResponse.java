package com.supertech.superbatch.batch.batch.dto;

import com.supertech.superbatch.batch.batch.enums.BatchStatus;

import lombok.Builder;

@Builder
public record BatchInfoResponse(
                String batchNo,
                String product,
                String unit,
                String shiftIncharge,
                RecipeInfo masterRecipe,
                RecipeInfo controlRecipe,
                BatchStatus batchStatus) {

        @Builder
        public record RecipeInfo(
                        Long id,
                        String name) {
        }

}
