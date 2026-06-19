package com.supertech.superbatch.manager.module.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.manager.module.dto.ModuleResponse;
import com.supertech.superbatch.manager.module.service.ModuleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ModuleController {
    private final ModuleService moduleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ModuleResponse>>> getAll() {
        List<ModuleResponse> modules = moduleService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Modules fetched success.", modules));
    }

}
