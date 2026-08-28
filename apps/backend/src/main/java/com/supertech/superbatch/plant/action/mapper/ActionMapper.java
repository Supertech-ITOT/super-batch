package com.supertech.superbatch.plant.action.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.action.dto.ActionAudit;
import com.supertech.superbatch.plant.action.dto.ActionResponse;
import com.supertech.superbatch.plant.action.dto.CreateActionRequest;
import com.supertech.superbatch.plant.action.dto.UpdateActionRequest;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.plant.dto.PlantAudit;
import com.supertech.superbatch.plant.plant.entity.Plant;

@Component
public class ActionMapper {
    public ActionResponse toResponse(Action action) {
        return ActionResponse.builder()
                .id(action.getId())
                .name(action.getName())
                .build();
    }

    public Action toEntity(CreateActionRequest request) {
        return Action.builder().name(request.name()).build();
    }

    public void updateEntity(Action action, UpdateActionRequest request) {
        action.setName(request.name());
    }

    public ActionAudit copy(Action action) {
        if (action == null) {
            return null;
        }
        return ActionAudit.builder()
                .id(action.getId())
                .name(action.getName())
                .build();
    }

}
