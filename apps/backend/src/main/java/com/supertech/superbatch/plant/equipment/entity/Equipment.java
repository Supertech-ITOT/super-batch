package com.supertech.superbatch.plant.equipment.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;
import com.supertech.superbatch.plant.unit.entity.Unit;

import jakarta.persistence.*;

import lombok.*;
@Entity
@Table(name = "equipment")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String code;

    @Column(length = 500)
    private String description;

    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EquipmentType equipmentType;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder.Default
    @ManyToMany
    @JoinTable(
        name = "equipment_unit",
        joinColumns = @JoinColumn(name = "equipment_id"),
        inverseJoinColumns = @JoinColumn(name = "unit_id")
    )
    @JsonIgnore
    private Set<Unit> units = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "creator_unit_id", nullable = false)
    private Unit creatorUnit;
}