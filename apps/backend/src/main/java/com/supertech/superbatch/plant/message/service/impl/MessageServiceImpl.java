package com.supertech.superbatch.plant.message.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.message.dto.CreateMessageRequest;
import com.supertech.superbatch.plant.message.dto.MessageResponse;
import com.supertech.superbatch.plant.message.dto.UpdateMessageRequest;
import com.supertech.superbatch.plant.message.entity.Message;
import com.supertech.superbatch.plant.message.mapper.MessageMapper;
import com.supertech.superbatch.plant.message.repository.MessageRepository;
import com.supertech.superbatch.plant.message.service.MessageService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final MessageMapper messagesMapper;

    @Override
    public List<MessageResponse> getAll() {
        return messageRepository.findAll()
                .stream()
                .map(messagesMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public void create(CreateMessageRequest request) {
        Message messages = messagesMapper.toEntity(request);
        messageRepository.save(messages);
    }

    @Override
    @Transactional
    public void update(Long id, UpdateMessageRequest request) {
        Message messages = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        messagesMapper.updateEntity(messages, request);
        messageRepository.save(messages);
    }

    @Override
    @Transactional
    public void delete(long id) {
        Message messages = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        messageRepository.delete(messages);
    }

    @Override
    public MessageResponse getById(Long id) {
        Message messages = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        return messagesMapper.toResponse(messages);
    }

}
