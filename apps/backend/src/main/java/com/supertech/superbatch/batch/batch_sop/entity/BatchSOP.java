package com.supertech.superbatch.batch.batch_sop.entity;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop_material.entity.BatchSOPMaterial;
import com.supertech.superbatch.batch.batch_sop_parameter.entity.BatchSOPParameter;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "batch_sop")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BatchSOP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "batch_id", nullable = false)
    private Batch batch;

    @Column(nullable = false)
    private Integer stepNo;

    private Double stdTime;

    private Double actTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transition_id", nullable = false)
    private Transition transition;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "action_id", nullable = false)
    private Action action;

    @Column(length = 500)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_equipment_id")
    private Equipment fromEquipment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_equipment_id")
    private Equipment toEquipment;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    @OneToMany(mappedBy = "batchSOP", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<BatchSOPMaterial> materials = new LinkedHashSet<>();

    @OneToMany(mappedBy = "batchSOP", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<BatchSOPParameter> parameters = new LinkedHashSet<>();
}