package com.supertech.superbatch.manager.module.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Module {
    @Id
    private Long id;

    private String name;

}
