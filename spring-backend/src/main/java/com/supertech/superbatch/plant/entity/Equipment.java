package com.supertech.superbatch.plant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supertech.superbatch.plant.enums.EquipmentType;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private EquipmentType equipmentType;

    @ManyToOne
    @JsonIgnore
    private Unit unit;
}