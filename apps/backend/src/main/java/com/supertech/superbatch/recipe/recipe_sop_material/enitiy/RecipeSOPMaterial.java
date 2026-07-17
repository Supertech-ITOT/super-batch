package com.supertech.superbatch.recipe.recipe_sop_material.enitiy;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipe_sop_material")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeSOPMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private RecipeSOP recipeSOP;

    @ManyToOne(fetch = FetchType.LAZY)
    private Material material;

    private Double stdQty;
}