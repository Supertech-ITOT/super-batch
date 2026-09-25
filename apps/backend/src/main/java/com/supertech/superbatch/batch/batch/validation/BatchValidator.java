package com.supertech.superbatch.batch.batch.validation;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.dto.MaterialRequest;
import com.supertech.superbatch.batch.batch.dto.ParameterRequest;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop_parameter.entity.BatchSOPParameter;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.plant.transition.enums.TransitionType;

@Component
public class BatchValidator {

        public void validateMaterialRequests(BatchSOP step, List<MaterialRequest> materialRequests) {

                String transitionName = step.getTransition().getName();
                boolean materialCharge = transitionName.equals(TransitionType.AUTO_MATERIAL_CHARGE.getDisplayName())
                                || transitionName.equals(TransitionType.MANUAL_MATERIAL_CHARGE.getDisplayName());

                if (materialCharge && (materialRequests == null || materialRequests.isEmpty())) {
                        throw new BadRequestException(
                                        "Material Qty is required in Transition criteria auto material charge and manual material charge.");
                }
        }

        public void validateParameters(BatchSOP step, List<ParameterRequest> parameterRequests) {
                List<ParameterRequest> requests = parameterRequests != null ? parameterRequests : List.of();
                Set<Long> stepParameterIds = step.getParameters()
                                .stream()
                                .map(parameter -> parameter.getParameter().getId())
                                .collect(Collectors.toSet());

                // Supplied parameters must belong to this step
                for (ParameterRequest request : requests) {
                        if (!stepParameterIds.contains(request.parameterId())) {
                                throw new BadRequestException(
                                                "Parameter does not belong to this step: " + request.parameterId());
                        }
                }

                // Every parameter configured for the step must be supplied
                for (BatchSOPParameter parameter : step.getParameters()) {
                        boolean provided = requests.stream().anyMatch(request -> parameter.getParameter().getId()
                                        .equals(request.parameterId()));

                        if (!provided) {
                                throw new BadRequestException("Parameter is required for this step: "
                                                + parameter.getParameter().getName());
                        }
                }
        }
}