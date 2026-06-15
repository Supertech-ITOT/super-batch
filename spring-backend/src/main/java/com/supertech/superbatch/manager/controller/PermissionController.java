package com.supertech.superbatch.manager.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.common.security.UserContextService;
import com.supertech.superbatch.manager.dto.PermissionResponse;
import com.supertech.superbatch.manager.service.PermissionService;

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
}