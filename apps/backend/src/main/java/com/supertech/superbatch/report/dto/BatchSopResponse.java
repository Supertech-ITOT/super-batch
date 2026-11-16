package com.supertech.superbatch.report.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.batch.batch_sop.enums.BatchSOPStatus;

import lombok.Builder;

@Builder
public record BatchSopResponse(
                Long id,
                Integer stepNo,
                String action,
                String transition,
                String message,
                String fromEquipment,
                String toEquipment,
                LocalDateTime startDateTime,
                LocalDateTime endDateTime,
                Integer standardTime,
                Integer actualTime,
                Integer varianceTime,
                BatchSOPStatus status,
                String remark) {

}
