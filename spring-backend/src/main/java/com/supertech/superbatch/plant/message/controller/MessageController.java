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
import com.supertech.superbatch.plant.message.dto.CreateMessagesRequest;
import com.supertech.superbatch.plant.message.dto.MessagesResponse;
import com.supertech.superbatch.plant.message.dto.UpdateMessagesRequest;
import com.supertech.superbatch.plant.message.service.MessagesService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MessageController {
    private final MessagesService messagesService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MessagesResponse>>> getAll() {
        List<MessagesResponse> messages = messagesService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Messages fetched successfully", messages));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MessagesResponse>> getById(@PathVariable Long id) {
        MessagesResponse message = messagesService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Message fetched successfully", message));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Valid @RequestBody CreateMessagesRequest request) {
        messagesService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Message created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateMessagesRequest request) {
        messagesService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Message updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {
        messagesService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Message deleted successfully", null));
    }

}
