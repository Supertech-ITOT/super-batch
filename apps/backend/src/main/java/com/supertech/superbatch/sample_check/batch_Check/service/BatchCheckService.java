package com.supertech.superbatch.sample_check.batch_check.service;

import java.util.List;

import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckRequest;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckResponse;

public interface BatchCheckService {
    void create(BatchCheckRequest request);

    List<BatchCheckResponse> getByBatchNoAndStepNo(String batchNo, Integer stepNo);
}
