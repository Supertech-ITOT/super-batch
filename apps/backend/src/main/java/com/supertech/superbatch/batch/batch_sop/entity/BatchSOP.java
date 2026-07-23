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

    @ManyToOne(fetch = FetchType.LAZY)
    private Batch batch;

    private Integer stepNo;

    private Double stdTime;

    private Double actTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private Transition transition;

    @ManyToOne(fetch = FetchType.LAZY)
    private Action action;

    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    private Equipment fromEquipment;

    @ManyToOne(fetch = FetchType.LAZY)
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
