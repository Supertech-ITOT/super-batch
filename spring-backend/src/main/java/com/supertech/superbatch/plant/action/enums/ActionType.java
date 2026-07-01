package com.supertech.superbatch.plant.action.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActionType {
    PRECHECKS("Prechecks"),
    DISCHARGE("Discharge"),
    OPERATOR_ACTION("Operator Action"),
    TRANSFER("Transfer"),
    TRANSFER_AND_RELEASE("Transfer and Release"),
    STIRRING("Stirring");

    private final String displayName;
}
