package com.supertech.superbatch.batch.batch.dto;

import lombok.Builder;

@Builder
public record BatchNoResponse(
                Long id,
                String batchNo) {
}