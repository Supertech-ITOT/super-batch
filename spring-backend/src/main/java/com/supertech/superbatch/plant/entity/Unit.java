package com.supertech.superbatch.plant.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supertech.superbatch.common.enums.UomType;
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

    @ManyToOne
    @JsonIgnore
    private Area area;

    @Builder.Default
    @ManyToMany(mappedBy = "units")
    @OrderBy("name ASC")
    private Set<Equipment> equipments = new HashSet<>();

    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private UomType batchSizeUom;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
