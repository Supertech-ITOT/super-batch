package com.supertech.superbatch.recipe.recipe_parameter.entity;

import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeParameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    private Parameter parameter;

    private Double stdValue;
}