package com.supertech.superbatch.plant.plant.entity;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.supertech.superbatch.plant.area.entity.Area;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "plant")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @OneToMany(mappedBy = "plant")
    @OrderBy("name ASC")
    private Set<Area> areas;

    @Column(length = 500)
    private String description;

    @Column(length = 255)
    private String location;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}