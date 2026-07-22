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

    private Integer stepNo;

    private Double stdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    private Transition transition;

    @ManyToOne(fetch = FetchType.LAZY)
    private Action action;

    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    private Equipment fromEquipment;

    @ManyToOne(fetch = FetchType.LAZY)
    private Equipment toEquipment;

    @OneToMany(mappedBy = "recipeSOP", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<RecipeSOPMaterial> materials = new LinkedHashSet<>();

    @OneToMany(mappedBy = "recipeSOP", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<RecipeSOPParameter> parameters = new LinkedHashSet<>();
}