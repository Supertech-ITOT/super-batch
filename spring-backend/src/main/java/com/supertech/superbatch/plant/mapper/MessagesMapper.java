package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Controller;

import com.supertech.superbatch.plant.dto.Messages.CreateMessagesRequest;
import com.supertech.superbatch.plant.dto.Messages.MessagesResponse;
import com.supertech.superbatch.plant.dto.Messages.UpdateMessagesRequest;
import com.supertech.superbatch.plant.entity.Messages;

@Controller
public class MessagesMapper {
    public MessagesResponse toResponse(Messages messages) {
        return MessagesResponse.builder().id(messages.getId()).name(messages.getName()).build();
    }

    public Messages toEntity(CreateMessagesRequest request) {
        return Messages.builder().name(request.name()).build();
    }

    public void updateEntity(Messages messages, UpdateMessagesRequest request) {
        messages.setName(request.name());
    }

}
