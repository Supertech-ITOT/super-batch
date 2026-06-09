package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Action.ActionResponse;
import com.supertech.superbatch.plant.dto.Action.CreateActionRequest;
import com.supertech.superbatch.plant.dto.Action.UpdateActionRequest;
import com.supertech.superbatch.plant.entity.ActionMaster;

@Component
public class ActionMapper {
    public ActionResponse toResponse(ActionMaster transition) {
        return new ActionResponse(
                transition.getId(),
                transition.getCode(),
                transition.getName(),
                transition.getActive());
    }

    public ActionMaster toEntity(CreateActionRequest request) {
        return ActionMaster.builder().id(request.id()).code(request.code()).name(request.name())
                .active(request.active()).build();
    }

    public void updateEntity(ActionMaster actionMaster, UpdateActionRequest request) {
        actionMaster.setId(request.id());
        actionMaster.setCode(request.code());
        actionMaster.setName(request.name());
        actionMaster.setActive(request.active());
    }

}
