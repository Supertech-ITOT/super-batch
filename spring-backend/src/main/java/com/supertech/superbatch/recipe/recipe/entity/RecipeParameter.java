package com.supertech.superbatch.recipe.recipe.entity;

import com.supertech.superbatch.plant.parameter.entity.Parameter;

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

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "parameter_id")
    private Parameter parameter;

    private Double stdValue;
}