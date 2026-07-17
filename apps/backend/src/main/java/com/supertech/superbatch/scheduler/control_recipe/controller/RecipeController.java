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
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.dto.RecipeResponse;
import com.supertech.superbatch.recipe.recipe.dto.UpdateRecipeRequest;
import com.supertech.superbatch.recipe.recipe.service.RecipeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecipeController {
        private final RecipeService recipeService;
        private final UserContextService userContextService;

        @PostMapping
        public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateRecipeRequest request) {
                Long userId = userContextService.getCurrentUserId();
                recipeService.create(request, userId);
                return ResponseEntity.ok(ApiResponse.success("Recipe header created successfully", null));
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<RecipeResponse>>> getAll() {
                List<RecipeResponse> recipes = recipeService.getAll();
                return ResponseEntity.ok(ApiResponse.success("All recipe header fetched successfully", recipes));
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<RecipeResponse>> getById(@PathVariable Long id) {
                RecipeResponse recipe = recipeService.getById(id);
                return ResponseEntity.ok(ApiResponse.success("Recipe header fetched successfully", recipe));
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
                        @Valid @RequestBody UpdateRecipeRequest request) {
                recipeService.update(id, request);
                return ResponseEntity.ok(ApiResponse.success("Recipe header updated successfully", null));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
                recipeService.delete(id);
                return ResponseEntity.ok(ApiResponse.success("Recipe header deleted successfully", null));
        }
}
