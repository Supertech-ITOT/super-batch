package com.supertech.superbatch.batch.batch.helper;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.dto.MaterialRequest;
import com.supertech.superbatch.batch.batch.dto.ParameterRequest;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop_material.entity.BatchSOPMaterial;
import com.supertech.superbatch.batch.batch_sop_parameter.entity.BatchSOPParameter;

@Component
public class BatchExecutionHelper {
    public void updateMaterialQuantities(BatchSOP step, List<MaterialRequest> materialRequests) {
        List<MaterialRequest> requests = materialRequests != null ? materialRequests : List.of();
        Map<Long, MaterialRequest> requestMap = requests.stream()
                .collect(Collectors.toMap(MaterialRequest::materialId, Function.identity()));

        for (BatchSOPMaterial material : step.getMaterials()) {
            MaterialRequest request = requestMap.get(material.getMaterial().getId());
            material.setActQty(request != null ? request.actQty() : 0.0);
        }
    }

    public void completeStepTiming(BatchSOP step, LocalDateTime now) {
        if (step.getStartDateTime() == null) {
            return;
        }

        double elapsedMinutes = Duration.between(step.getStartDateTime(), now).toMillis() / 60000.0;
        step.setActTime((step.getActTime() == null ? 0.0 : step.getActTime()) + elapsedMinutes);
    }

    public void updateParameterValues(BatchSOP step, List<ParameterRequest> parameterRequests) {
        List<ParameterRequest> requests = parameterRequests != null ? parameterRequests : List.of();
        Map<Long, ParameterRequest> requestMap = requests.stream()
                .collect(Collectors.toMap(ParameterRequest::parameterId, Function.identity()));

        for (BatchSOPParameter parameter : step.getParameters()) {
            ParameterRequest request = requestMap.get(parameter.getParameter().getId());
            parameter.setActValue(request != null ? request.actValue() : 0.0);
        }
    }
}
