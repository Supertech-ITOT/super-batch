package com.supertech.superbatch.plant.controller;

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
import com.supertech.superbatch.plant.dto.Action.ActionResponse;
import com.supertech.superbatch.plant.dto.Action.CreateActionRequest;
import com.supertech.superbatch.plant.dto.Action.UpdateActionRequest;
import com.supertech.superbatch.plant.service.ActionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/actions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ActionController {
    private final ActionService actionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ActionResponse>>> getAll() {
        List<ActionResponse> actions = actionService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All Actions fetched successfully", actions));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ActionResponse>> getById(
            @PathVariable Long id) {
        ActionResponse action = actionService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Action fetched successfully", action));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateActionRequest request) {
        actionService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Action created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateActionRequest request) {
        actionService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Action updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        actionService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Action deleted successfully", null));
    }

}
