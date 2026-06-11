package com.supertech.superbatch.plant.entity;

import com.supertech.superbatch.common.enums.UomType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parameter {

    @Id
    private Long id;

    private String name;

    private String code;

    private Boolean active;

    @Enumerated(EnumType.STRING)
    private UomType uom;

}
