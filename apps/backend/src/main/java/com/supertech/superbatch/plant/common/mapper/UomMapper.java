package com.supertech.superbatch.plant.common.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.plant.common.dto.UomResponse;

@Component
public class UomMapper {

    public UomResponse toResponse(UomType uom) {
        return new UomResponse(
                uom.getSymbol(),
                uom.getValue());
    }
}