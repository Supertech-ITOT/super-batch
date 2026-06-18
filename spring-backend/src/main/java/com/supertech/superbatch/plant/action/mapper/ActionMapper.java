package com.supertech.superbatch.plant.action.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.action.dto.ActionResponse;
import com.supertech.superbatch.plant.action.dto.CreateActionRequest;
import com.supertech.superbatch.plant.action.dto.UpdateActionRequest;
import com.supertech.superbatch.plant.action.entity.Action;

@Component
public class ActionMapper {
    public ActionResponse toResponse(Action transition) {
        return new ActionResponse(
                transition.getId(),
                transition.getName());
    }

    public Action toEntity(CreateActionRequest request) {
        return Action.builder().name(request.name()).build();
    }

    public void updateEntity(Action actionMaster, UpdateActionRequest request) {
        actionMaster.setName(request.name());
    }

}
