package com.supertech.superbatch.scheduler.control_recipe_sop.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;

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

    @Column(nullable = false)
    private Integer stepNo;

    private Double stdTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "control_recipe_id", nullable = false)
    private ControlRecipe controlRecipe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transition_id", nullable = false)
    private Transition transition;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "action_id", nullable = false)
    private Action action;

    @Column(length = 500)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_equipment_id")
    private Equipment fromEquipment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_equipment_id")
    private Equipment toEquipment;

    @OneToMany(mappedBy = "controlRecipeSOP", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ControlRecipeSOPMaterial> materials = new LinkedHashSet<>();

    @OneToMany(mappedBy = "controlRecipeSOP", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ControlRecipeSOPParameter> parameters = new LinkedHashSet<>();
}