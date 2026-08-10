package com.supertech.superbatch.plant.parameter.entity;

import com.supertech.superbatch.common.enums.UomType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parameter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private UomType uom;
}