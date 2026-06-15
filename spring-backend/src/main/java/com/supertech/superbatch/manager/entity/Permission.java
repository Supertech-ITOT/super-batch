package com.supertech.superbatch.manager.entity;

import com.supertech.superbatch.manager.enums.ModuleType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "permission", uniqueConstraints = {
        @UniqueConstraint(name = "uk_role_module", columnNames = { "role_id", "module_id" })
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "module_id", nullable = false)
    private ModuleType module;

    @Builder.Default
    private boolean canRead = false;

    @Builder.Default
    private boolean canWrite = false;

}
