package com.supertech.superbatch.plant.mapper;

import com.supertech.superbatch.plant.dto.Action.ActionResponse;
import com.supertech.superbatch.plant.entity.ActionMaster;

public class ActionMapper {
    public ActionResponse toResponse(ActionMaster transition) {
        return new ActionResponse(
                transition.getId(),
                transition.getCode(),
                transition.getName(),
                transition.getActive());
    }

}
