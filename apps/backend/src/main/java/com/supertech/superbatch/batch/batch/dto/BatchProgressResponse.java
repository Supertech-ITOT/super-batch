package com.supertech.superbatch.batch.batch.dto;

import lombok.Builder;

@Builder
public record BatchProgressResponse(
                Integer progress,
                Integer totalStep,
                Integer completedStep,
                Integer currentStep,
                Integer pendingStep,
                Integer skippedStep

) {

}
