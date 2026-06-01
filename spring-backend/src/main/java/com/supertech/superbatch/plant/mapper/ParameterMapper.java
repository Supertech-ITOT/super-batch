package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;
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

}
