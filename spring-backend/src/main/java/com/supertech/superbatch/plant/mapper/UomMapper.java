package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.plant.dto.UOM.UomResponse;

@Component
public class UomMapper {

    public UomResponse toResponse(UomType uom) {
        return new UomResponse(
                uom.getSymbol(),
                uom.getValue());
    }
}