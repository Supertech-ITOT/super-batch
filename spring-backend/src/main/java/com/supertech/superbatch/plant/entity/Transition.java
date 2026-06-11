package com.supertech.superbatch.plant.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Transition {
    @Id
    private Long id;
    private String name;
    private String code;
    private Boolean active;

}
