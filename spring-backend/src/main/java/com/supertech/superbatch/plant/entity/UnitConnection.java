package com.supertech.superbatch.plant.entity;

import com.supertech.superbatch.plant.enums.ConnectionType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "uk_unit_connection", columnNames = { "source_unit_id", "destination_unit_id" })
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnitConnection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "source_unit_id", nullable = false)
    private Unit sourceUnit;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "destination_unit_id", nullable = false)
    private Unit destinationUnit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConnectionType connectionType;
}