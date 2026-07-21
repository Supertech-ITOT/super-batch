package com.supertech.superbatch.scheduler.control_recipe.controller;

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
import com.supertech.superbatch.common.security.UserContextService;
import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.CreateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.UpdateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.service.ControlRecipeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/control-recipe")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ControlRecipeController {
        private final ControlRecipeService controlRecipeService;
        private final UserContextService userContextService;

        @PostMapping
        public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateControlRecipeRequest request) {
                Long userId = userContextService.getCurrentUserId();
                controlRecipeService.create(request, userId);
                return ResponseEntity.ok(ApiResponse.success("Batch Scheduled successfully", null));
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<ControlRecipeResponse>>> getAll() {
                List<ControlRecipeResponse> controlRecipeResponses = controlRecipeService.getAll();
                return ResponseEntity.ok(
                                ApiResponse.success("All Control recipe fetched successfully", controlRecipeResponses));
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<ControlRecipeResponse>> getById(@PathVariable Long id) {
                ControlRecipeResponse controlRecipeResponse = controlRecipeService.getById(id);
                return ResponseEntity
                                .ok(ApiResponse.success("Control Recipe fetched successfully", controlRecipeResponse));
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
                        @Valid @RequestBody UpdateControlRecipeRequest request) {
                controlRecipeService.update(id, request);
                return ResponseEntity.ok(ApiResponse.success("Batch Schedule updated successfully", null));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
                controlRecipeService.delete(id);
                return ResponseEntity.ok(ApiResponse.success("Control Recipe deleted successfully", null));
        }
}
