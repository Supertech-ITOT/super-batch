package com.supertech.superbatch.plant.enums;

import com.supertech.superbatch.common.enums.UomType;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ParameterType {

    TEMPERATURE(1L, "Temperature", UomType.CELSIUS),
    PRESSURE(2L, "Pressure", UomType.BAR),
    LEVEL(3L, "Level", UomType.LITER),
    WEIGHT(4L, "Weight", UomType.KG),
    SPEED(5L, "Speed", UomType.RPM),
    FLOW(6L, "Flow Rate", UomType.LITER_PER_MINUTE);

    private final Long id;
    private final String displayName;
    private final UomType defaultUom;
}
