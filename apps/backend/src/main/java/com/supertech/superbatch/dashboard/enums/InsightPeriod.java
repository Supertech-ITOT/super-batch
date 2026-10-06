package com.supertech.superbatch.dashboard.enums;

public enum InsightPeriod {
    SEVEN_DAYS(7),
    THIRTY_DAYS(30),
    NINETY_DAYS(90);

    private final int days;

    InsightPeriod(int days) {
        this.days = days;
    }

    public int getDays() {
        return days;
    }
}