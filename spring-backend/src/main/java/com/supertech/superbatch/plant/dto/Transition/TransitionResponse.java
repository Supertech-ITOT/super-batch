package com.supertech.superbatch.plant.dto.Transition;

public record TransitionResponse(
        Long id,
        String name,
        String code,
        Boolean active

) {
}