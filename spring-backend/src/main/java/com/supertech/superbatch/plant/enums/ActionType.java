package com.supertech.superbatch.plant.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActionType {
    CHARGE("Charge"),
    DISCHARGE("Discharge"),
    HEAT("Heat"),
    COOL("Cool"),
    MIX("Mix"),
    DOSE("Dose"),
    TRANSFER("Transfer"),
    WAIT("Wait"),
    MANUAL("Manual");

    private final String displayName;
}
