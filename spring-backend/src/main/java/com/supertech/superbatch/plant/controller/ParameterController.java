package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;
import com.supertech.superbatch.plant.service.ParameterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/parameters")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ParameterController {
    private final ParameterService materialService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ParameterResponse>>> getAll() {
        List<ParameterResponse> parameters = materialService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All Parameters fetched successfully", parameters));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ParameterResponse>> getById(
            @PathVariable Long id) {
        ParameterResponse parameter = materialService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Parameter fetched successfully", parameter));
    }
}
