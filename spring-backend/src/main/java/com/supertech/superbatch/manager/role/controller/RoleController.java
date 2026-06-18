package com.supertech.superbatch.manager.role.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.manager.role.dto.RoleRequest;
import com.supertech.superbatch.manager.role.dto.RoleResponse;
import com.supertech.superbatch.manager.role.service.RoleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RoleController {

        private final RoleService roleService;

        @GetMapping
        public ResponseEntity<ApiResponse<List<RoleResponse>>> getAll() {

                List<RoleResponse> roles = roleService.getAll();

                return ResponseEntity.ok(
                                ApiResponse.success("Roles fetched successfully", roles));
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<RoleResponse>> getById(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Role fetched successfully",
                                                roleService.getById(id)));
        }

        @PostMapping
        public ResponseEntity<ApiResponse<Void>> create(
                        @Validated @RequestBody RoleRequest request) {

                roleService.create(request);

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(ApiResponse.success("Role created successfully", null));
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> update(
                        @PathVariable Long id,
                        @Validated @RequestBody RoleRequest request) {

                roleService.update(id, request);

                return ResponseEntity.ok(
                                ApiResponse.success("Role updated successfully", null));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> delete(
                        @PathVariable Long id) {

                roleService.delete(id);

                return ResponseEntity.ok(
                                ApiResponse.success("Role deleted successfully", null));
        }
}