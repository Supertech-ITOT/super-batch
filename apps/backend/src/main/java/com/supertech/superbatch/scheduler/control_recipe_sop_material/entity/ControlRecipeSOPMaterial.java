package com.supertech.superbatch.scheduler.control_recipe_sop_material.entity;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "control_recipe_sop_material")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ControlRecipeSOPMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private ControlRecipeSOP controlRecipeSOP;

    @ManyToOne(fetch = FetchType.LAZY)
    private Material material;

    private Double stdQty;

}
