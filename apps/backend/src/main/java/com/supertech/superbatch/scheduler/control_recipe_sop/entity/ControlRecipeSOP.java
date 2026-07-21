package com.supertech.superbatch.scheduler.control_recipe_sop.entity;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "control_recipe_sop")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ControlRecipeSOP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer stepNo;

    private Double stdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private ControlRecipe controlRecipe;

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
