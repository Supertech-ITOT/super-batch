package com.supertech.superbatch.plant.message.service;

import java.util.List;

import com.supertech.superbatch.plant.message.dto.CreateMessagesRequest;
import com.supertech.superbatch.plant.message.dto.MessagesResponse;
import com.supertech.superbatch.plant.message.dto.UpdateMessagesRequest;

public interface MessagesService {
    void create(CreateMessagesRequest request);

    void update(Long id, UpdateMessagesRequest request);

    void delete(long id);

    List<MessagesResponse> getAll();

    MessagesResponse getById(Long id);

}
