package com.supertech.superbatch.plant.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransitionType {

    EQ(1L, "Equal"),
    GE(2L, "Greater Than Equal"),
    LE(3L, "Less Than Equal"),
    GT(4L, "Greater Than"),
    LT(5L, "Less Than"),
    TIMER(6L, "Timer"),
    RANGE(7L, "Range");

    private final Long id;
    private final String displayName;
}