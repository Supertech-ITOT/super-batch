package com.supertech.superbatch.recipe.recipe.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.recipe.recipe.dto.CreateRecipeRequest;
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

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Valid @RequestBody CreateRecipeRequest request) {

        recipeService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Step added successfully", null));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Void>> update(
            @Valid @RequestBody UpdateRecipeRequest request) {

        recipeService.update(request);
        return ResponseEntity.ok(ApiResponse.success("Step updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        recipeService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Step deleted successfully", null));
    }

    @PatchMapping("/{id}/move-up")
    public ResponseEntity<ApiResponse<Void>> moveUp(
            @PathVariable Long id) {

        recipeService.moveUp(id);
        return ResponseEntity.ok(ApiResponse.success("Step moved up successfully", null));
    }

    @PatchMapping("/{id}/move-down")
    public ResponseEntity<ApiResponse<Void>> moveDown(
            @PathVariable Long id) {

        recipeService.moveDown(id);
        return ResponseEntity.ok(ApiResponse.success("Step moved down successfully", null));
    }

    @PostMapping("/{id}/insert-above")
    public ResponseEntity<ApiResponse<Void>> insertAbove(
            @PathVariable Long id,
            @Valid @RequestBody CreateRecipeRequest request) {

        recipeService.insertAbove(id, request);
        return ResponseEntity.ok(ApiResponse.success("Step inserted above successfully", null));
    }

    @PostMapping("/{id}/insert-below")
    public ResponseEntity<ApiResponse<Void>> insertBelow(
            @PathVariable Long id,
            @Valid @RequestBody CreateRecipeRequest request) {

        recipeService.insertBelow(id, request);
        return ResponseEntity.ok(ApiResponse.success("Step inserted below successfully", null));
    }
}