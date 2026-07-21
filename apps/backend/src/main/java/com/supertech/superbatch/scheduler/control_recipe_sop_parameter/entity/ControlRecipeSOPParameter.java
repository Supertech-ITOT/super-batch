package com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity;

import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "control_recipe_sop_parameter")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ControlRecipeSOPParameter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private ControlRecipeSOP controlRecipeSOP;

    @ManyToOne(fetch = FetchType.LAZY)
    private Parameter parameter;

    private Double stdValue;

}
