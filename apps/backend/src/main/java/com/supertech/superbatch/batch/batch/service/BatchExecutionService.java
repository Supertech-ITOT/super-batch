package com.supertech.superbatch.batch.batch.service;

import com.supertech.superbatch.batch.batch.dto.StepChangeRequest;

public interface BatchExecutionService {
    void start(String batchNo);

    void download(String batchNo);

    void pause(String batchNo, Integer stepNo, String remark);

    void resume(String batchNo, Integer stepNo);

    void abort(String batchNo, Integer stepNo, String remark);

    void remark(String batchNo, Integer stepNo, String remark);

    void onStepChange(String batchNo, StepChangeRequest req);

}
