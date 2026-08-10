package com.supertech.superbatch.plant.area.entity;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supertech.superbatch.plant.plant.entity.Plant;
import com.supertech.superbatch.plant.unit.entity.Unit;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "area")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "plant_id", nullable = false)
    @JsonIgnore
    private Plant plant;

    @OneToMany(mappedBy = "area")
    @OrderBy("name ASC")
    private Set<Unit> units;

    @Column(length = 500)
    private String description;

    @Column(nullable = false, length = 50)
    private String areaType;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}