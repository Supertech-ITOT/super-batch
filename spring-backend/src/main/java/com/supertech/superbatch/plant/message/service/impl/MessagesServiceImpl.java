package com.supertech.superbatch.plant.message.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.message.dto.CreateMessagesRequest;
import com.supertech.superbatch.plant.message.dto.MessagesResponse;
import com.supertech.superbatch.plant.message.dto.UpdateMessagesRequest;
import com.supertech.superbatch.plant.message.entity.Messages;
import com.supertech.superbatch.plant.message.mapper.MessagesMapper;
import com.supertech.superbatch.plant.message.repository.MessagesRepository;
import com.supertech.superbatch.plant.message.service.MessagesService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessagesServiceImpl implements MessagesService {
    private final MessagesRepository messagesRepository;
    private final MessagesMapper messagesMapper;

    @Override
    public List<MessagesResponse> getAll() {
        return messagesRepository.findAll()
                .stream()
                .map(messagesMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public void create(CreateMessagesRequest request) {
        Messages messages = messagesMapper.toEntity(request);
        messagesRepository.save(messages);
    }

    @Override
    @Transactional
    public void update(Long id, UpdateMessagesRequest request) {
        Messages messages = messagesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        messagesMapper.updateEntity(messages, request);
        messagesRepository.save(messages);
    }

    @Override
    @Transactional
    public void delete(long id) {
        Messages messages = messagesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        messagesRepository.delete(messages);
    }

    @Override
    public MessagesResponse getById(Long id) {
        Messages messages = messagesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        return messagesMapper.toResponse(messages);
    }

}
