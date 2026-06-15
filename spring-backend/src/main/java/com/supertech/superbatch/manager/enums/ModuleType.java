package com.supertech.superbatch.manager.enums;

public enum ModuleType {

    PLANT_MODEL(1L),
    USER(2L),
    ROLE(3L),
    AUDIT(4L),
    RECIPE(5L),
    SCHEDULER(6L),
    REPORT(7L);

    private final Long id;

    ModuleType(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public static ModuleType fromId(Long id) {
        for (ModuleType module : values()) {
            if (module.id.equals(id)) {
                return module;
            }
        }
        throw new IllegalArgumentException("Unknown module id: " + id);
    }
}