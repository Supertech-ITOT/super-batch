package com.supertech.superbatch.batch.batch.service;

import java.util.List;

import com.supertech.superbatch.batch.batch.dto.BatchAbortResponse;
import com.supertech.superbatch.batch.batch.dto.BatchInfoResponse;
import com.supertech.superbatch.batch.batch.dto.BatchProgressResponse;
import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;

public interface BatchService {

    BatchAbortResponse getAbortDetails(Long batchId);

    BatchResponse getByBatchNo(String batchNo);

    RecipeInfoResponse getRecipeInfoByBatchNo(String batchNo);

    BatchSOPResponse getStepInfoByBatchNoAndStepNo(String batchNo, Integer stepNo);

    List<String> getBatchNos(String unitCode, BatchStatus status);

    BatchInfoResponse getBatchInfoById(Long id);

    BatchProgressResponse getBatchProgressById(Long id);

}
