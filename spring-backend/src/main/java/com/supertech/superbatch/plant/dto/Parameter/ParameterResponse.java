package com.supertech.superbatch.plant.dto.Parameter;

import java.time.LocalDateTime;
import com.supertech.superbatch.common.enums.UomType;

public record ParameterResponse(
                Long id,
                String code,
                String name,
                UomType uom,
                String description,
                LocalDateTime createdAt,
                LocalDateTime updatedAt

) {
}