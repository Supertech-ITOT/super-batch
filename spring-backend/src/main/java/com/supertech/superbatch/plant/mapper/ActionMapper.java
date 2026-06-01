package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Action.ActionResponse;
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

}
