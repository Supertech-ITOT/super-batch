package com.supertech.superbatch.plant.message.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.message.dto.CreateMessageRequest;
import com.supertech.superbatch.plant.message.dto.MessageResponse;
import com.supertech.superbatch.plant.message.dto.UpdateMessageRequest;
import com.supertech.superbatch.plant.message.service.MessageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MessageController {
    private final MessageService messageService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MessageResponse>>> getAll() {
        List<MessageResponse> message = messageService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Message fetched successfully", message));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MessageResponse>> getById(@PathVariable Long id) {
        MessageResponse message = messageService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Message fetched successfully", message));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Valid @RequestBody CreateMessageRequest request) {
        messageService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Message created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateMessageRequest request) {
        messageService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Message updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {
        messageService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Message deleted successfully", null));
    }

}
