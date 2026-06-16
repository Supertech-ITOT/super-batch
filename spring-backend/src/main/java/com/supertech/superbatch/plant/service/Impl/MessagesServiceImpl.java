package com.supertech.superbatch.plant.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Messages.CreateMessagesRequest;
import com.supertech.superbatch.plant.dto.Messages.MessagesResponse;
import com.supertech.superbatch.plant.dto.Messages.UpdateMessagesRequest;
import com.supertech.superbatch.plant.entity.Messages;
import com.supertech.superbatch.plant.mapper.MessagesMapper;
import com.supertech.superbatch.plant.repository.MessagesRepository;
import com.supertech.superbatch.plant.service.MessagesService;

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

}
