package com.supertech.superbatch.recipe.recipe_sop.entity;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
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
public class RecipeSOP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer stepNo;

    private Double stdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private RecipeHeader recipeHeader;

    @ManyToOne(fetch = FetchType.LAZY)
    private Transition transition;

    @ManyToOne(fetch = FetchType.LAZY)
    private Action action;

    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    private Equipment fromEquipment;

    @ManyToOne(fetch = FetchType.LAZY)
    private Equipment toEquipment;
}