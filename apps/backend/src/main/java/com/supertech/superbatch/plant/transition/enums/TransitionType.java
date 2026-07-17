package com.supertech.superbatch.plant.transition.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransitionType {

    MANUAL_CONFIRMATION("Manual Confirmation"),
    AUTO_MATERIAL_CHARGE("Auto Material Charge"),
    MANUAL_MATERIAL_CHARGE("Manual Material Charge"),
    TIME("Time"),
    EVENT("Event"),
    SAMPLE_CHECK("Sample Check"),
    TRANSFER("Transfer"),
    RELEASE_EQUIPMENT("Release Equipment");

    private final String displayName;
}