package com.supertech.superbatch.report.dto;

import java.time.LocalDate;

import com.supertech.superbatch.batch.batch.enums.BatchStatus;

public record ReportFilterRequest(
                String search,
                LocalDate fromDate,
                LocalDate toDate,
                BatchStatus batchStatus,
                Long masterRecipeId,
                Long unitId,
                Long productId,
                Integer page,
                Integer size) {

}
