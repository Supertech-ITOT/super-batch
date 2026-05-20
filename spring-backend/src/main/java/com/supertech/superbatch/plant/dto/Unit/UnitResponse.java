package com.supertech.superbatch.plant.dto.Unit;

import com.supertech.superbatch.plant.enums.UnitType;

public record UnitResponse(
        Long id,
        String name,
        Long areaid,
        UnitType unitType

) {

}
