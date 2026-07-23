package com.supertech.superbatch.batch.batch_sop_parameter.entity;

import jakarta.persistence.*;
import lombok.*;

import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.plant.parameter.entity.Parameter;

@Entity
@Table(name = "batch_sop_parameter")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BatchSOPParameter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private BatchSOP batchSOP;

    @ManyToOne(fetch = FetchType.LAZY)
    private Parameter parameter;

    private Double stdValue;

    private Double actValue;
}
