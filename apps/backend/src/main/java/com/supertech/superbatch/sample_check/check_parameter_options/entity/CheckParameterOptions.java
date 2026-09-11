package com.supertech.superbatch.sample_check.check_parameter_options.entity;

import com.supertech.superbatch.sample_check.check_Parameter.entity.CheckParameter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CheckParameterOptions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private CheckParameter checkParameter;

    private String value;

    private boolean isAllowed;

}
