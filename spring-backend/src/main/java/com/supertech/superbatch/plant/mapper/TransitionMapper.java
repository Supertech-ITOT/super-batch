package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Transition.TransitionResponse;
import com.supertech.superbatch.plant.entity.TransitionMaster;

@Component
public class TransitionMapper {
    public TransitionResponse toResponse(TransitionMaster transition) {
        return new TransitionResponse(
                transition.getId(),
                transition.getCode(),
                transition.getName(),
                transition.getActive());
    }
}
