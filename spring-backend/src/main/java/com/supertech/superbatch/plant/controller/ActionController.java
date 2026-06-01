package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Action.ActionResponse;
import com.supertech.superbatch.plant.service.ActionService;

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

}
