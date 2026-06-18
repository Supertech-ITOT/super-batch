package com.supertech.superbatch.plant.parameter.enums;

import com.supertech.superbatch.common.enums.UomType;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ParameterType {

    TEMPERATURE("Temperature", UomType.CELSIUS),
    PRESSURE("Pressure", UomType.BAR),
    LEVEL("Level", UomType.LITER),
    WEIGHT("Weight", UomType.KG),
    SPEED("Speed", UomType.RPM),
    FLOW("Flow Rate", UomType.LITER_PER_MINUTE);

    private final String displayName;
    private final UomType defaultUom;
}
