package com.supertech.superbatch.sample_check.check_Parameter.entity;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.sample_check.check_Parameter.enums.DataType;

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

    @Column(nullable = false, length = 50)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    private DataType dataType;

    @Enumerated(EnumType.STRING)
    private UomType uom;

    @Column(nullable = false)
    @Builder.Default
    private boolean deleted = false;

    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deleted_by_id")
    private User deletedBy;

}
