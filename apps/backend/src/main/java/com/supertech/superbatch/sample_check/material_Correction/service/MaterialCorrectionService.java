package com.supertech.superbatch.sample_check.material_correction.service;

import java.util.List;

import com.supertech.superbatch.sample_check.material_correction.dto.MaterialCorrectionRequest;
import com.supertech.superbatch.sample_check.material_correction.dto.MaterialCorrectionResponse;

public interface MaterialCorrectionService {
    void create(MaterialCorrectionRequest request);

    List<MaterialCorrectionResponse> getByBatchNoAndStepNo(String batchNo, Integer stepNo);
}
