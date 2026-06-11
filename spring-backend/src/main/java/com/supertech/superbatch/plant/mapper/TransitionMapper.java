package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Transition.CreateTransitionRequest;
import com.supertech.superbatch.plant.dto.Transition.UpdateTransitionRequest;
import com.supertech.superbatch.plant.dto.Transition.TransitionResponse;
import com.supertech.superbatch.plant.entity.Transition;

@Component
public class TransitionMapper {
    public TransitionResponse toResponse(Transition transition) {
        return new TransitionResponse(
                transition.getId(),
                transition.getCode(),
                transition.getName(),
                transition.getActive());
    }

    public Transition toEntity(CreateTransitionRequest request) {
        return Transition.builder()
                .id(request.id())
                .code(request.code())
                .name(request.name())
                .active(request.active())
                .build();
    }

    public void updateEntity(Transition transitionMaster, UpdateTransitionRequest request) {
        transitionMaster.setId(request.id());
        transitionMaster.setCode(request.code());
        transitionMaster.setName(request.name());
        transitionMaster.setActive(request.active());
    }
}
