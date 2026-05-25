package com.supertech.superbatch.plant.entity;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supertech.superbatch.common.enums.StatusType;
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

    private String code;

    private String description;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private StatusType status = StatusType.ACTIVE;

    @Enumerated(EnumType.STRING)
    private UnitType unitType;

    @ManyToOne
    @JsonIgnore
    private Area area;

    @OneToMany(mappedBy = "unit")
    @OrderBy("name ASC")
    private Set<Equipment> equipments;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
