package com.supertech.superbatch.manager.entity;

import jakarta.persistence.*;
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
