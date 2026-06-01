package com.supertech.superbatch.plant.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActionType {

    CHARGE(1L, "Charge"),
    DISCHARGE(2L, "Discharge"),
    HEAT(3L, "Heat"),
    COOL(4L, "Cool"),
    MIX(5L, "Mix"),
    DOSE(6L, "Dose"),
    TRANSFER(7L, "Transfer"),
    WAIT(8L, "Wait"),
    MANUAL(9L, "Manual");

    private final Long id;
    private final String displayName;
}
