package com.supertech.superbatch.plant.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supertech.superbatch.plant.enums.UnitType;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private UnitType unitType;

    @ManyToOne
    @JsonIgnore
    private Area area;

    @OneToMany(mappedBy = "unit")
    @OrderBy("name ASC")
    private Set<Equipment> equipments;
}
