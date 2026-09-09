package com.supertech.superbatch.sample_check.batch_Check.entity;

import java.time.LocalDateTime;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.plant.unit.entity.Unit;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class BatchCheck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Batch batch;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "batch_sop_id")
    private BatchSOP batchSOP;

    private Integer loop;

    private LocalDateTime sampleDateTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Unit unit;

}
