package com.supertech.superbatch.plant.transition.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransitionType {

    EQ("Equal"),
    GE("Greater Than Equal"),
    LE("Less Than Equal"),
    GT("Greater Than"),
    LT("Less Than"),
    TIMER("Timer"),
    RANGE("Range");

    private final String displayName;
}