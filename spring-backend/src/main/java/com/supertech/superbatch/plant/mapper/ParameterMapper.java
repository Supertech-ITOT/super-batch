package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Parameter.CreateParameterRequest;
import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;
import com.supertech.superbatch.plant.dto.Parameter.UpdateParameterRequest;
import com.supertech.superbatch.plant.entity.Parameter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ParameterMapper {
    private final UomMapper uomMapper;

    public ParameterResponse toResponse(Parameter parameter) {
        return new ParameterResponse(
                parameter.getId(),
                parameter.getName(),
                uomMapper.toResponse(parameter.getUom()));
    }

    public Parameter toEntity(CreateParameterRequest request) {
        return Parameter.builder()
                .name(request.name())
                .uom(request.uom())
                .build();

    }

    public void updateEntity(Parameter parameterMaster, UpdateParameterRequest request) {
        parameterMaster.setName(request.name());
        parameterMaster.setUom(request.uom());
    }

}
