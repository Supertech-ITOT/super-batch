package com.supertech.superbatch.sample_check.check_parameter.mapper;

import java.util.List;

import org.springframework.stereotype.Component;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterAudit;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterOptionAudit;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterOptionsResponse;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterRequest;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterResponse;
import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;
import com.supertech.superbatch.sample_check.check_parameter.enums.CheckParameterType;
import com.supertech.superbatch.sample_check.check_parameter_options.entity.CheckParameterOptions;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CheckParameterMapper {
        public CheckParameterResponse toResponse(CheckParameter checkParameter) {
                List<CheckParameterOptionsResponse> options = checkParameter.getCheckParameterOptions().stream()
                                .map(this::toOptionsResponse).toList();

                return CheckParameterResponse.builder()
                                .id(checkParameter.getId())
                                .name(checkParameter.getName())
                                .product(checkParameter.getMaterial().getName())
                                .type(checkParameter.getType())
                                .min(checkParameter.getMin())
                                .max(checkParameter.getMax())
                                .options(options)
                                .build();
        }

        public CheckParameter toEntity(CheckParameterRequest request, Material material) {
                boolean quantitative = request.type() == CheckParameterType.QUANTITATIVE;
                return CheckParameter.builder()
                                .name(request.name())
                                .type(request.type())
                                .min(quantitative ? request.min() : 0)
                                .max(quantitative ? request.max() : 0)
                                .material(material)
                                .build();
        }

        public void updateEntity(CheckParameter checkParameter, CheckParameterRequest request, Material material) {

                boolean quantitative = request.type() == CheckParameterType.QUANTITATIVE;

                checkParameter.setName(request.name());
                checkParameter.setType(request.type());
                checkParameter.setMin(quantitative ? request.min() : 0);
                checkParameter.setMax(quantitative ? request.max() : 0);
                checkParameter.setMaterial(material);
        }

        private CheckParameterOptionsResponse toOptionsResponse(CheckParameterOptions option) {
                return CheckParameterOptionsResponse.builder()
                                .id(option.getId())
                                .value(option.getValue())
                                .isAllowed(option.isAllowed())
                                .build();
        }

        public CheckParameterAudit copy(CheckParameter checkParameter) {
                if (checkParameter == null) {
                        return null;
                }
                return CheckParameterAudit.builder()
                                .id(checkParameter.getId())
                                .name(checkParameter.getName())
                                .product(checkParameter.getMaterial().getName())
                                .type(checkParameter.getType().name())
                                .min(checkParameter.getMin())
                                .max(checkParameter.getMax())
                                .options(checkParameter.getCheckParameterOptions().stream()
                                                .map(option -> new CheckParameterOptionAudit(option.getId(),
                                                                option.getValue(), option.isAllowed()))
                                                .toList())
                                .build();

        }
}
