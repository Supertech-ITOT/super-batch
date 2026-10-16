package com.supertech.superbatch.batch.batch.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.supertech.superbatch.batch.batch_sop.enums.BatchSOPStatus;

import lombok.Builder;

@Builder
public record BatchSOPResponse(
                Long id,
                Long batchId,
                Integer stepNo,
                Double stdTime,
                Double actTime,
                Long transitionId,
                String transitionName,
                Long actionId,
                String actionName,
                String message,
                Long fromEquipmentId,
                String fromEquipmentName,
                String fromEquipmentCode,
                Long toEquipmentId,
                String toEquipmentName,
                String toEquipmentCode,
                LocalDateTime startDateTime,
                LocalDateTime endDateTime,
                BatchSOPStatus status,
                String remark,
                List<BatchSOPMaterialResponse> materials,
                List<BatchSOPParameterResponse> parameters

) {

}
