package com.supertech.superbatch.sample_check.check_parameter.mapper;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterAudit;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterOptionsResponse;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterRequest;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterResponse;
import com.supertech.superbatch.sample_check.check_parameter.dto.CheckParameterResponse.MaterialResponse;
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
                                .product(checkParameter.getMaterials().stream()
                                                .map(material -> new MaterialResponse(material.getId(),
                                                                material.getName()))
                                                .toList())
                                .type(checkParameter.getType())
                                .min(checkParameter.getMin())
                                .max(checkParameter.getMax())
                                .options(options)
                                .build();
        }

        public CheckParameter toEntity(CheckParameterRequest request, List<Material> materials) {
                boolean quantitative = request.type() == CheckParameterType.QUANTITATIVE;
                return CheckParameter.builder()
                                .name(request.name())
                                .type(request.type())
                                .min(quantitative ? request.min() : 0)
                                .max(quantitative ? request.max() : 0)
                                .materials(new LinkedHashSet<>(materials))
                                .build();
        }

        public void updateEntity(CheckParameter checkParameter, CheckParameterRequest request,
                        List<Material> materials) {

                boolean quantitative = request.type() == CheckParameterType.QUANTITATIVE;

                checkParameter.setName(request.name());
                checkParameter.setType(request.type());
                checkParameter.setMin(quantitative ? request.min() : 0);
                checkParameter.setMax(quantitative ? request.max() : 0);
                checkParameter.setMaterials(new LinkedHashSet<>(materials));
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
                                .product(checkParameter.getMaterials().stream()
                                                .map(Material::getName).sorted().collect(Collectors.joining(", ")))
                                .type(checkParameter.getType().name())
                                .min(checkParameter.getMin())
                                .max(checkParameter.getMax())
                                .options(
                                                checkParameter.getCheckParameterOptions().stream()
                                                                .map(option -> option.getValue() + " (allowed: "
                                                                                + option.isAllowed() + ")")
                                                                .collect(Collectors.joining(", ")))
                                .build();

        }
}
