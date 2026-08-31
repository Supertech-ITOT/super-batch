package com.supertech.superbatch.plant.message.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.enums.BatchAuditAction;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.manager.module.enums.EntityType;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.plant.message.dto.CreateMessageRequest;
import com.supertech.superbatch.plant.message.dto.MessageAudit;
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
@RequiresPermission(ModuleType.PLANT_MODEL)
@RequiresLicense()
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final MessageMapper messagesMapper;
    private final BatchAuditService batchAuditService;

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
        audit(BatchAuditAction.CREATED, null, messagesMapper.copy(messages));

    }

    @Override
    @Transactional
    public void update(Long id, UpdateMessageRequest request) {
        Message messages = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        MessageAudit oldData = messagesMapper.copy(messages);
        messagesMapper.updateEntity(messages, request);
        messageRepository.save(messages);
        audit(BatchAuditAction.UPDATED, oldData, messagesMapper.copy(messages));
    }

    @Override
    @Transactional
    public void delete(long id) {
        Message messages = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        audit(BatchAuditAction.DELETED, messagesMapper.copy(messages), null);
        messageRepository.delete(messages);
    }

    @Override
    public MessageResponse getById(Long id) {
        Message messages = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message Not Found"));
        return messagesMapper.toResponse(messages);
    }

    private void audit(BatchAuditAction action, MessageAudit oldData, MessageAudit newData) {
        batchAuditService.save(
                BatchAuditRequest.builder()
                        .entity(EntityType.MESSAGE)
                        .module(ModuleType.PLANT_MODEL)
                        .action(action)
                        .oldData(oldData)
                        .newData(newData)
                        .build());
    }

}
