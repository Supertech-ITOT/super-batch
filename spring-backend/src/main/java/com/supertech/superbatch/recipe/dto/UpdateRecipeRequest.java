package com.supertech.superbatch.recipe.dto;

import com.supertech.superbatch.common.enums.UomType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRecipeRequest {
    private String name;

    private String description;

    private Double batchSize;

    private UomType batchSizeUom;

}
