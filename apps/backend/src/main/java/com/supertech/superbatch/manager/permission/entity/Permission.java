package com.supertech.superbatch.manager.permission.entity;

import com.supertech.superbatch.manager.module.entity.Module;
import com.supertech.superbatch.manager.role.entity.Role;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;

    @Builder.Default
    private boolean canRead = false;

    @Builder.Default
    private boolean canWrite = false;

}
