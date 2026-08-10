package com.supertech.superbatch.plant.transition.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "transition")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    @Builder.Default
    private Boolean canDelete = true;
}