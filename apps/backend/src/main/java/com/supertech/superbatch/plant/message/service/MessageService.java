package com.supertech.superbatch.plant.message.service;

import java.util.List;

import com.supertech.superbatch.plant.message.dto.CreateMessageRequest;
import com.supertech.superbatch.plant.message.dto.MessageResponse;
import com.supertech.superbatch.plant.message.dto.UpdateMessageRequest;

public interface MessageService {
    void create(CreateMessageRequest request);

    void update(Long id, UpdateMessageRequest request);

    void delete(long id);

    List<MessageResponse> getAll();

    MessageResponse getById(Long id);

}
