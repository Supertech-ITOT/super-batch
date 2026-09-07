package com.supertech.superbatch.batch.batch.dto;

import lombok.Builder;

@Builder
public record BatchSOPMaterialResponse(
        Long id,
        Long materialId,
        String materialName,
        Double stdQty,
        Double actQty) {

}
