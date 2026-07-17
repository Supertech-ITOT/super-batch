package com.supertech.superbatch.manager.module.enums;

public enum ModuleType {

    MANAGER(1L),
    PLANT_MODEL(2L),
    RECIPE(3L),
    SCHEDULER(4L),
    AUDIT(5L);

    private final Long id;

    ModuleType(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

}