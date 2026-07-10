package com.supertech.superbatch.plant.message.mapper;

import org.springframework.stereotype.Controller;

import com.supertech.superbatch.plant.message.dto.CreateMessageRequest;
import com.supertech.superbatch.plant.message.dto.MessageResponse;
import com.supertech.superbatch.plant.message.dto.UpdateMessageRequest;
import com.supertech.superbatch.plant.message.entity.Message;

@Controller
public class MessageMapper {
    public MessageResponse toResponse(Message message) {
        return MessageResponse.builder().id(message.getId()).name(message.getName()).build();
    }

    public Message toEntity(CreateMessageRequest request) {
        return Message.builder().name(request.name()).build();
    }

    public void updateEntity(Message message, UpdateMessageRequest request) {
        message.setName(request.name());
    }

}
