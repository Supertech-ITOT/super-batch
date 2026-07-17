package com.supertech.superbatch.plant.transition.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.transition.dto.CreateTransitionRequest;
import com.supertech.superbatch.plant.transition.dto.TransitionResponse;
import com.supertech.superbatch.plant.transition.dto.UpdateTransitionRequest;
import com.supertech.superbatch.plant.transition.entity.Transition;

@Component
public class TransitionMapper {
    public TransitionResponse toResponse(Transition transition) {
        return new TransitionResponse(
                transition.getId(),
                transition.getName());
    }

    public Transition toEntity(CreateTransitionRequest request) {
        return Transition.builder()
                .name(request.name())
                .build();
    }

    public void updateEntity(Transition transitionMaster, UpdateTransitionRequest request) {
        transitionMaster.setName(request.name());
    }
}
