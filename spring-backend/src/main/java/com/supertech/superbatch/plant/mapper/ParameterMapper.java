package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Parameter.CreateParameterRequest;
import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;
import com.supertech.superbatch.plant.dto.Parameter.UpdateParameterRequest;
import com.supertech.superbatch.plant.entity.ParameterMaster;

@Component
public class ParameterMapper {
    public ParameterResponse toResponse(ParameterMaster parameter) {
        return new ParameterResponse(
                parameter.getId(),
                parameter.getCode(),
                parameter.getName(),
                parameter.getUom(),
                parameter.getActive());
    }

    public ParameterMaster toEntity(CreateParameterRequest request) {
        return ParameterMaster.builder()
                .id(request.id())
                .code(request.code())
                .active(request.active())
                .name(request.name())
                .uom(request.uom())
                .build();

    }

    public void updateEntity(ParameterMaster parameterMaster, UpdateParameterRequest request) {
        parameterMaster.setId(request.id());
        parameterMaster.setName(request.name());
        parameterMaster.setCode(request.code());
        parameterMaster.setUom(request.uom());
        parameterMaster.setActive(request.active());
    }

}
