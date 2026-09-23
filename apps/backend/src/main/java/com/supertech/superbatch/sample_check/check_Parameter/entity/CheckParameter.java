package com.supertech.superbatch.sample_check.check_parameter.entity;

import java.time.LocalDateTime;
import java.util.*;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.sample_check.check_parameter.enums.CheckParameterType;
import com.supertech.superbatch.sample_check.check_parameter_options.entity.CheckParameterOptions;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class CheckParameter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    private Double min;

    private Double max;

    @OneToMany(mappedBy = "checkParameter")
    @OrderBy("value ASC")
    @Builder.Default
    private Set<CheckParameterOptions> checkParameterOptions = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Material material;

    @Enumerated(EnumType.STRING)
    private CheckParameterType type;

    @Column(nullable = false)
    @Builder.Default
    private boolean deleted = false;

    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deleted_by_id")
    private User deletedBy;

}
