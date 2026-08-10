package com.supertech.superbatch.recipe.recipe_sop_parameter.entity;

import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipe_sop_parameter")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeSOPParameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipesop_id", nullable = false)
    private RecipeSOP recipeSOP;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "parameter_id", nullable = false)
    private Parameter parameter;

    private Double stdValue;
}