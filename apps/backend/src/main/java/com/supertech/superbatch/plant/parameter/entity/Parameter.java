package com.supertech.superbatch.plant.parameter.entity;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.manager.user.entity.User;

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

    @Column(nullable = false)
    @Builder.Default
    private boolean deleted = false;

    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deleted_by_id")
    private User deletedBy;
}