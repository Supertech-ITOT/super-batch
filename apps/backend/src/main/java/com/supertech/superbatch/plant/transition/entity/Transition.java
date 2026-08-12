package com.supertech.superbatch.plant.transition.entity;

import java.time.LocalDateTime;

import com.supertech.superbatch.manager.user.entity.User;

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

    @Column(nullable = false)
    @Builder.Default
    private boolean deleted = false;

    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deleted_by_id")
    private User deletedBy;
}