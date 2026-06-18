package com.supertech.superbatch.manager.permission.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
import com.supertech.superbatch.common.security.UserContextService;
import com.supertech.superbatch.manager.permission.dto.PermissionRequest;
import com.supertech.superbatch.manager.permission.dto.PermissionResponse;
import com.supertech.superbatch.manager.permission.service.PermissionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PermissionController {

    private final PermissionService permissionService;
    private final UserContextService userContextService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<PermissionResponse>>> getMyPermissions() {
        Long userId = userContextService.getCurrentUserId();
        List<PermissionResponse> res = permissionService.getUserPermissions(userId);
        return ResponseEntity.ok(ApiResponse.success("Permission fetched succesfully", res));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PermissionResponse>>> getAll() {
        List<PermissionResponse> res = permissionService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Permissions fetched successfully", res));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Validated @RequestBody PermissionRequest request) {

        permissionService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Permission created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(
            @PathVariable Long id,
            @Validated @RequestBody PermissionRequest request) {

        permissionService.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("Permission updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        permissionService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.success("Permission deleted successfully", null));
    }
}