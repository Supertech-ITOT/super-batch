package com.supertech.superbatch.recipe.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.recipe.enums.RecipeStatus;

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

    private RecipeStatus status;

    private Double batchSize;

    private UomType batchSizeUom;

    private String createdBy;

    private LocalDateTime updatedAt;
}
