package com.supertech.superbatch.recipe.recipe_sop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.CreateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.UpdateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.service.RecipeSOPService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecipeController {

    private final RecipeSOPService recipeSOPService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RecipeSOPResponse>> getById(@PathVariable Long id) {
        RecipeSOPResponse response = recipeSOPService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Step fetched successfully", response));
    }

    @GetMapping("/header/{recipeHeaderId}")
    public ResponseEntity<ApiResponse<List<RecipeSOPResponse>>> getAllByRecipeHeaderId(
            @PathVariable Long recipeHeaderId) {
        List<RecipeSOPResponse> response = recipeSOPService.getAllByRecipeHeaderId(recipeHeaderId);
        return ResponseEntity.ok(ApiResponse.success("Step fetched successfully", response));

    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Valid @RequestBody CreateRecipeSOPRequest request) {

        recipeSOPService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Step added successfully", null));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Void>> update(
            @Valid @RequestBody UpdateRecipeSOPRequest request) {

        recipeSOPService.update(request);
        return ResponseEntity.ok(ApiResponse.success("Step updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        recipeSOPService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Step deleted successfully", null));
    }

    @PatchMapping("/{id}/move-up")
    public ResponseEntity<ApiResponse<Void>> moveUp(
            @PathVariable Long id) {

        recipeSOPService.moveUp(id);
        return ResponseEntity.ok(ApiResponse.success("Step moved up successfully", null));
    }

    @PatchMapping("/{id}/move-down")
    public ResponseEntity<ApiResponse<Void>> moveDown(
            @PathVariable Long id) {

        recipeSOPService.moveDown(id);
        return ResponseEntity.ok(ApiResponse.success("Step moved down successfully", null));
    }

    @PostMapping("/{id}/insert-above")
    public ResponseEntity<ApiResponse<Void>> insertAbove(
            @PathVariable Long id,
            @Valid @RequestBody CreateRecipeSOPRequest request) {

        recipeSOPService.insertAbove(id, request);
        return ResponseEntity.ok(ApiResponse.success("Step inserted above successfully", null));
    }

    @PostMapping("/{id}/insert-below")
    public ResponseEntity<ApiResponse<Void>> insertBelow(
            @PathVariable Long id,
            @Valid @RequestBody CreateRecipeSOPRequest request) {

        recipeSOPService.insertBelow(id, request);
        return ResponseEntity.ok(ApiResponse.success("Step inserted below successfully", null));
    }
}