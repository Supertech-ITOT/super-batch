package com.supertech.superbatch.manager.enums;

public enum ModuleType {

    PLANT_MODEL(1),
    USER(2),
    ROLE(3),
    AUDIT(4),
    RECIPE(5),
    SCHEDULER(6),
    REPORT(7);

    private final Long id;

    ModuleType(long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}