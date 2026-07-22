package com.supertech.superbatch.audit.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;

import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.module.enums.ModuleType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BatchAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private BatchAuditAction action;

    @Enumerated(EnumType.STRING)
    private ModuleType module;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performed_by")
    private User performedBy;

    @UpdateTimestamp
    private LocalDateTime performedAt;

    @Column(columnDefinition = "TEXT")
    private String oldData;

    @Column(columnDefinition = "TEXT")
    private String newData;
}
