package com.supertech.superbatch.recipe.recipe_material.enitiy;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material;

    private Double stdQty;
}