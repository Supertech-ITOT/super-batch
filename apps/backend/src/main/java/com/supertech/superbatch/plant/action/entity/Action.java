package com.supertech.superbatch.plant.action.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "action")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Action {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    @Builder.Default
    private Boolean canDelete = true;
}