package com.supertech.superbatch.batch.batch.service;

import java.util.List;
import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.dto.StepChangeRequest;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;

public interface BatchService {
    void start(String batchNo);

    void download(String batchNo);

    void pause(String batchNo, Integer stepNo, String remark);

    void resume(String batchNo, Integer stepNo);

    void abort(String batchNo, Integer stepNo, String remark);

    void remark(String batchNo, Integer stepNo, String remark);

    BatchResponse getByBatchNo(String batchNo);

    RecipeInfoResponse getRecipeInfoByBatchNo(String batchNo);

    BatchSOPResponse getStepInfoByBatchNoAndStepNo(String batchNo, Integer stepNo);

    List<String> getBatchNos(String unitCode, BatchStatus status);

    void onStepChange(String batchNo, StepChangeRequest req);

}
