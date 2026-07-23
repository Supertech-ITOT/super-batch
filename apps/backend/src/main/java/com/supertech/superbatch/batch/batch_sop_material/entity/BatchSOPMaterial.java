package com.supertech.superbatch.batch.batch_sop_material.entity;

import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.plant.material.entity.Material;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "batch_sop_material")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BatchSOPMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private BatchSOP batchSOP;

    @ManyToOne(fetch = FetchType.LAZY)
    private Material material;

    private Double stdQty;

    private Double actQty;
}
