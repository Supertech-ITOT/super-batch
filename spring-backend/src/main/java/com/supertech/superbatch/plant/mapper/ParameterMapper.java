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
                parameter.getCode(),
                parameter.getName(),
                uomMapper.toResponse(parameter.getUom()),
                parameter.getActive());
    }

    public Parameter toEntity(CreateParameterRequest request) {
        return Parameter.builder()
                .id(request.id())
                .code(request.code())
                .active(request.active())
                .name(request.name())
                .uom(request.uom())
                .build();

    }

    public void updateEntity(Parameter parameterMaster, UpdateParameterRequest request) {
        parameterMaster.setId(request.id());
        parameterMaster.setName(request.name());
        parameterMaster.setCode(request.code());
        parameterMaster.setUom(request.uom());
        parameterMaster.setActive(request.active());
    }

}
