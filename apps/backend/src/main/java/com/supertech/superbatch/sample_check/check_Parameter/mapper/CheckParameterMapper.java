package com.supertech.superbatch.sample_check.check_Parameter.mapper;

import java.util.List;

import org.springframework.stereotype.Component;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterOptionsResponse;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterRequest;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterResponse;
import com.supertech.superbatch.sample_check.check_Parameter.entity.CheckParameter;
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
                                .type(checkParameter.getType().name())
                                .min(checkParameter.getMin())
                                .max(checkParameter.getMax())
                                .options(options)
                                .build();
        }

        public CheckParameter toEntity(CheckParameterRequest request, Material material) {
                return CheckParameter.builder()
                                .name(request.name())
                                .type(request.type())
                                .min(request.min())
                                .max(request.max())
                                .material(material)
                                .build();
        }

        public void updateEntity(CheckParameter checkParameter, CheckParameterRequest request, Material material) {
                checkParameter.setName(request.name());
                checkParameter.setType(request.type());
                checkParameter.setMin(request.min() != null ? request.min() : 0.0);
                checkParameter.setMax(request.max() != null ? request.max() : 0.0);
                checkParameter.setMaterial(material);
        }

        private CheckParameterOptionsResponse toOptionsResponse(CheckParameterOptions option) {
                return CheckParameterOptionsResponse.builder()
                                .id(option.getId())
                                .value(option.getValue())
                                .isAllowed(option.isAllowed())
                                .build();
        }
}
