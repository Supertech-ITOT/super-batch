package com.supertech.superbatch.recipe.recipe.entity;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer stepNo;

    private Double stdTime;

    @ManyToOne
    private RecipeHeader recipeHeader;

    @ManyToOne
    private Transition transition;

    @ManyToOne
    private Action action;

    private String message;
}