package com.supertech.superbatch.manager.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.manager.dto.User.UserRequest;
import com.supertech.superbatch.manager.dto.User.UserResponse;
import com.supertech.superbatch.manager.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

        private final UserService userService;

        @GetMapping
        public ResponseEntity<ApiResponse<List<UserResponse>>> getAll() {

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Users fetched successfully",
                                                userService.getAll()));
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<UserResponse>> getById(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "User fetched successfully",
                                                userService.getById(id)));
        }

        @PostMapping
        public ResponseEntity<ApiResponse<Void>> create(
                        @Validated @RequestBody UserRequest request) {

                userService.create(request);

                return ResponseEntity.ok(ApiResponse.success(
                                "User created successfully",
                                null));
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> update(
                        @PathVariable Long id,
                        @Validated @RequestBody UserRequest request) {

                userService.update(id, request);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "User updated successfully",
                                                null));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> delete(
                        @PathVariable Long id) {

                userService.delete(id);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "User deleted successfully",
                                                null));
        }
}