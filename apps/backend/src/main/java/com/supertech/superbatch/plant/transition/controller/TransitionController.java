package com.supertech.superbatch.plant.transition.controller;

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
import com.supertech.superbatch.plant.transition.dto.CreateTransitionRequest;
import com.supertech.superbatch.plant.transition.dto.TransitionResponse;
import com.supertech.superbatch.plant.transition.dto.UpdateTransitionRequest;
import com.supertech.superbatch.plant.transition.service.TransitionService;

import jakarta.validation.Valid;
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

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateTransitionRequest request) {
        transitionService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Transition created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateTransitionRequest request) {
        transitionService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Transition updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        transitionService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Transition deleted successfully", null));
    }

}
