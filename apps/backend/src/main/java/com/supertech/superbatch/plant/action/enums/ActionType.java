package com.supertech.superbatch.plant.action.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActionType {
    PRECHECKS("Prechecks"),
    DISCHARGE("Discharge"),
    OPERATOR_ACTION("Operator Action"),
    STIRRING("Stirring"),
    CHARGING("Charging");

    private final String displayName;
}
