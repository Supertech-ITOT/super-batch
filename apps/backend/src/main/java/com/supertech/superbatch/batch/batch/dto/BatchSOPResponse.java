package com.supertech.superbatch.batch.batch.dto;

import java.time.LocalDateTime;
import java.util.List;

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
                Long toEquipmentId,
                String toEquipmentName,
                LocalDateTime startDateTime,
                LocalDateTime endDateTime,
                String remark,
                List<BatchSOPMaterialResponse> materials,
                List<BatchSOPParameterResponse> parameters

) {

}
