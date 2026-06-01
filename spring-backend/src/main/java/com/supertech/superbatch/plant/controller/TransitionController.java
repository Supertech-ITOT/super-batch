package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Transition.TransitionResponse;
import com.supertech.superbatch.plant.service.TransitionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transitions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TransitionController {
    private final TransitionService transitionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransitionResponse>>> getAll() {
        List<TransitionResponse> transitions = transitionService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All Transitions fetched successfully", transitions));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TransitionResponse>> getById(
            @PathVariable Long id) {
        TransitionResponse transition = transitionService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Transition fetched successfully", transition));
    }

}
