package com.supertech.superbatch.recipe.recipe_sop.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;
import com.supertech.superbatch.recipe.recipe_sop_parameter.entity.RecipeSOPParameter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipe_sop")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeSOP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer stepNo;

    private Double stdTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

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

    @OneToMany(mappedBy = "recipeSOP", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<RecipeSOPMaterial> materials = new LinkedHashSet<>();

    @OneToMany(mappedBy = "recipeSOP", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<RecipeSOPParameter> parameters = new LinkedHashSet<>();
}