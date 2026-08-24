package com.supertech.superbatch.audit.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.manager.user.entity.User;

import jakarta.persistence.*;
import lombok.*;
import com.supertech.superbatch.manager.module.entity.Module;
import com.supertech.superbatch.manager.module.enums.EntityType;

@Entity
@Table(name = "batch_audit")
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
    @Column(nullable = false)
    private EntityType entity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BatchAuditAction action;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "performed_by_id", nullable = false)
    private User performedBy;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime performedAt;

    @Column(columnDefinition = "TEXT")
    private String oldData;

    @Column(columnDefinition = "TEXT")
    private String newData;
}