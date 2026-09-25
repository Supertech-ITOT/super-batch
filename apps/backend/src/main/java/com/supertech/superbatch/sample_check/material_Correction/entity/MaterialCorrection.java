package com.supertech.superbatch.sample_check.material_correction.entity;

import java.time.LocalDateTime;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.plant.material.entity.Material;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaterialCorrection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Batch batch;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "batch_sop_id")
    private BatchSOP batchSOP;

    private LocalDateTime sampleDateTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Material material;

    private Double qty;

    private Integer loop;

}
