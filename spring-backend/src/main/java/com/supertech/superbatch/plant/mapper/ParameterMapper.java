package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Parameter.CreateParameterRequest;
import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;
import com.supertech.superbatch.plant.dto.Parameter.UpdateParameterRequest;
import com.supertech.superbatch.plant.entity.Parameter;

@Component
public class ParameterMapper {
    public ParameterResponse toResponse(Parameter parameter) {
        return new ParameterResponse(
                parameter.getId(),
                parameter.getCode(),
                parameter.getName(),
                parameter.getUom(),
                parameter.getDescription(),
                parameter.getCreatedAt(),
                parameter.getUpdatedAt());
    }

    public Parameter toEntity(CreateParameterRequest request) {
        return Parameter.builder()
                .name(request.name())
                .code(request.code())
                .description(request.description())
                .uom(request.uom()).build();

    }

    public void updateEntity(Parameter parameter, UpdateParameterRequest request) {
        parameter.setName(request.name());
        parameter.setCode(request.code());
        parameter.setDescription(request.description());
        parameter.setUom(request.uom());

    }
}
