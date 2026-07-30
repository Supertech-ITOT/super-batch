package com.supertech.superbatch.scheduler.control_recipe.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record EquipmentMappingRequest(

        @NotNull @Positive Long recipeEquipmentId,

        @NotNull @Positive Long executionEquipmentId

) {
}