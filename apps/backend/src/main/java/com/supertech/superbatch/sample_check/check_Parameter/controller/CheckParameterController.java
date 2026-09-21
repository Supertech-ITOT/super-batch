package com.supertech.superbatch.sample_check.check_Parameter.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterRequest;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterResponse;
import com.supertech.superbatch.sample_check.check_Parameter.service.CheckParameterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/check-parameters")
@RequiredArgsConstructor

public class CheckParameterController {
    private final CheckParameterService checkParameterService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CheckParameterRequest request) {
        checkParameterService.create(request);
        return ResponseEntity.ok(ApiResponse.success("CheckParameter created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CheckParameterResponse>>> getAll() {
        List<CheckParameterResponse> checkParameters = checkParameterService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All checkParameters fetched successfully", checkParameters));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CheckParameterResponse>> getById(@PathVariable Long id) {
        CheckParameterResponse checkParameter = checkParameterService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("checkParameter fetched successfully", checkParameter));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody CheckParameterRequest request) {
        checkParameterService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("CheckParameter updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id, @RequestParam Long currentUserId) {
        checkParameterService.delete(id, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("CheckParameter deleted successfully", null));
    }
}
