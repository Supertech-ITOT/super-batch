package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Messages.CreateMessagesRequest;
import com.supertech.superbatch.plant.dto.Messages.MessagesResponse;
import com.supertech.superbatch.plant.dto.Messages.UpdateMessagesRequest;

public interface MessagesService {
    void create(CreateMessagesRequest request);

    void update(Long id, UpdateMessagesRequest request);

    void delete(long id);

    List<MessagesResponse> getAll();

    MessagesResponse getById(Long id);

}
