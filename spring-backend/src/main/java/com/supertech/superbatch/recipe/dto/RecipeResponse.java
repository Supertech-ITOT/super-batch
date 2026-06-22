package com.supertech.superbatch.recipe.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.UomType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class RecipeResponse {
    private Long id;

    private String name;

    private String description;

    private Integer version;

    private String status;

    private Double batchSize;

    private UomType batchSizeUom;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
