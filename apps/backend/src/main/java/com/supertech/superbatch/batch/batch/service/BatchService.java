package com.supertech.superbatch.batch.batch.service;

import java.util.List;
import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;

public interface BatchService {
    void start(String batchNo);

    void pause(String batchNo);

    void resume(String batchNo);

    void abort(String batchNo);

    void complete(String batchNo, Integer stepNo);

    void remark(String batchNo, String remark);

    BatchResponse getByBatchNo(String batchNo);

    RecipeInfoResponse getRecipeInfoByBatchNo(String batchNo);

    BatchSOPResponse getStepInfoByBatchNoAndStepNo(String batchNo, Integer stepNo);

    List<String> getBatchNos(String unitCode, BatchStatus status);

}
