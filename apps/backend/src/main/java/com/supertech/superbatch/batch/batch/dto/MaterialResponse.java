package com.supertech.superbatch.batch.batch.dto;

import lombok.Builder;

@Builder
public record MaterialResponse(
        Long id,
        Long materialId,
        String materialCode,
        String materialName,
        Double stdQty) {
}