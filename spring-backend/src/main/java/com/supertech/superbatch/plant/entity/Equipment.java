package com.supertech.superbatch.plant.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supertech.superbatch.common.enums.StatusType;
import com.supertech.superbatch.common.enums.UomType;
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

    private String description;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private StatusType status = StatusType.ACTIVE;

    @Column(unique = true)
    private String tagName;

    @Enumerated(EnumType.STRING)
    private UomType uom;

    @Enumerated(EnumType.STRING)
    private EquipmentType equipmentType;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne
    @JsonIgnore
    private Unit unit;
}