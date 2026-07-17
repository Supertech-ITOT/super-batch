package com.supertech.superbatch.common.enums;

public enum UomType {
    CELSIUS("°C"),
    BAR("bar"),
    PSI("psi"),

    LITER("L"),
    KG("kg"),

    RPM("RPM"),
    PERCENT("%"),

    LITER_PER_MINUTE("L/min"),
    KG_PER_HOUR("kg/h"),

    PH("pH"),
    VOLT("V"),
    AMPERE("A");

    private final String symbol;

    UomType(String symbol) {
        this.symbol = symbol;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getValue() {
        return name();
    }
}
