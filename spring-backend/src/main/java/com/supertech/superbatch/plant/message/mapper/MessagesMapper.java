package com.supertech.superbatch.plant.message.mapper;

import org.springframework.stereotype.Controller;

import com.supertech.superbatch.plant.message.dto.CreateMessagesRequest;
import com.supertech.superbatch.plant.message.dto.MessagesResponse;
import com.supertech.superbatch.plant.message.dto.UpdateMessagesRequest;
import com.supertech.superbatch.plant.message.entity.Messages;

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
