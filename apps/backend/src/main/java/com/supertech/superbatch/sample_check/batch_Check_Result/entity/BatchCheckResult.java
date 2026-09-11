package com.supertech.superbatch.sample_check.batch_Check_Result.entity;

import com.supertech.superbatch.sample_check.batch_Check.entity.BatchCheck;
import com.supertech.superbatch.sample_check.batch_Check_Result.enums.ResultStatus;
import com.supertech.superbatch.sample_check.check_Parameter.entity.CheckParameter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BatchCheckResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private BatchCheck batchCheck;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private CheckParameter checkParameter;

    private String value;

    @Enumerated(EnumType.STRING)
    private ResultStatus resultStatus;
}
