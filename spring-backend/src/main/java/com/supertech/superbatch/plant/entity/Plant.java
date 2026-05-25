package com.supertech.superbatch.plant.entity;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.supertech.superbatch.common.enums.StatusType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "plant")
    @OrderBy("name ASC")
    private Set<Area> areas;

    private String description;

    private String location;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private StatusType status = StatusType.ACTIVE;

    private String plantType;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
