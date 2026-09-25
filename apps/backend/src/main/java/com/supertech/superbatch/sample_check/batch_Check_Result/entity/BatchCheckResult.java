package com.supertech.superbatch.sample_check.batch_check_result.entity;

import com.supertech.superbatch.sample_check.batch_check.entity.BatchCheck;
import com.supertech.superbatch.sample_check.batch_check_result.enums.ResultStatus;
import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BatchCheckResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private BatchCheck batchCheck;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private CheckParameter checkParameter;

    private String value;

    private Integer loop;

    @Enumerated(EnumType.STRING)
    private ResultStatus resultStatus;
}
