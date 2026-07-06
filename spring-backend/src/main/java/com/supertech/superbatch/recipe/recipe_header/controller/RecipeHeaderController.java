package com.supertech.superbatch.recipe.recipe_header.controller;

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
import com.supertech.superbatch.recipe.recipe_header.dto.CreateRecipeHeaderRequest;
import com.supertech.superbatch.recipe.recipe_header.dto.RecipeHeaderResponse;
import com.supertech.superbatch.recipe.recipe_header.dto.UpdateRecipeHeaderRequest;
import com.supertech.superbatch.recipe.recipe_header.service.RecipeHeaderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recipe-headers")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecipeHeaderController {
        private final RecipeHeaderService recipeHeaderService;
        private final UserContextService userContextService;

        @PostMapping
        public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateRecipeHeaderRequest request) {
                Long userId = userContextService.getCurrentUserId();
                recipeHeaderService.create(request, userId);
                return ResponseEntity.ok(ApiResponse.success("Recipe header created successfully", null));
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<RecipeHeaderResponse>>> getAll() {
                List<RecipeHeaderResponse> recipeHeaders = recipeHeaderService.getAll();
                return ResponseEntity.ok(ApiResponse.success("All recipe header fetched successfully", recipeHeaders));
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<RecipeHeaderResponse>> getById(@PathVariable Long id) {
                RecipeHeaderResponse recipeHeader = recipeHeaderService.getById(id);
                return ResponseEntity.ok(ApiResponse.success("Recipe header fetched successfully", recipeHeader));
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
                        @Valid @RequestBody UpdateRecipeHeaderRequest request) {
                recipeHeaderService.update(id, request);
                return ResponseEntity.ok(ApiResponse.success("Recipe header updated successfully", null));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
                recipeHeaderService.delete(id);
                return ResponseEntity.ok(ApiResponse.success("Recipe header deleted successfully", null));
        }
}
