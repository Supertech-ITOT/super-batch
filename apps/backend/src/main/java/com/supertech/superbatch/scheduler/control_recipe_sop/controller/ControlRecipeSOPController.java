package com.supertech.superbatch.scheduler.control_recipe_sop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPSummaryResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.CreateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.UpdateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.service.ControlRecipeSOPService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/control-recipe-sop")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ControlRecipeSOPController {

    private final ControlRecipeSOPService controlRecipeSOPService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ControlRecipeSOPResponse>> getById(@PathVariable Long id) {
        ControlRecipeSOPResponse response = controlRecipeSOPService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Step fetched successfully", response));
    }

    @GetMapping("/recipe/{id}")
    public ResponseEntity<ApiResponse<List<ControlRecipeSOPResponse>>> getAllByRecipeId(
            @PathVariable Long id) {
        List<ControlRecipeSOPResponse> response = controlRecipeSOPService.getAllByControlRecipeId(id);
        return ResponseEntity.ok(ApiResponse.success("Step fetched successfully", response));

    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Valid @RequestBody CreateControlRecipeSOPRequest request) {

        controlRecipeSOPService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Step added successfully", null));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Void>> update(
            @Valid @RequestBody UpdateControlRecipeSOPRequest request) {

        controlRecipeSOPService.update(request);
        return ResponseEntity.ok(ApiResponse.success("Step updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        controlRecipeSOPService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Step deleted successfully", null));
    }

    @PatchMapping("/{id}/move-up")
    public ResponseEntity<ApiResponse<Void>> moveUp(
            @PathVariable Long id) {

        controlRecipeSOPService.moveUp(id);
        return ResponseEntity.ok(ApiResponse.success("Step moved up successfully", null));
    }

    @PatchMapping("/{id}/move-down")
    public ResponseEntity<ApiResponse<Void>> moveDown(
            @PathVariable Long id) {

        controlRecipeSOPService.moveDown(id);
        return ResponseEntity.ok(ApiResponse.success("Step moved down successfully", null));
    }

    @PostMapping("/{id}/insert-above")
    public ResponseEntity<ApiResponse<Void>> insertAbove(
            @PathVariable Long id,
            @Valid @RequestBody CreateControlRecipeSOPRequest request) {

        controlRecipeSOPService.insertAbove(id, request);
        return ResponseEntity.ok(ApiResponse.success("Step inserted above successfully", null));
    }

    @PostMapping("/{id}/insert-below")
    public ResponseEntity<ApiResponse<Void>> insertBelow(
            @PathVariable Long id,
            @Valid @RequestBody CreateControlRecipeSOPRequest request) {

        controlRecipeSOPService.insertBelow(id, request);
        return ResponseEntity.ok(ApiResponse.success("Step inserted below successfully", null));
    }

    @GetMapping("/summary/{controlRecipeId}")
    public ResponseEntity<ApiResponse<ControlRecipeSOPSummaryResponse>> getSummaryByControlRecipeId(
            @PathVariable Long controlRecipeId) {

        ControlRecipeSOPSummaryResponse response = controlRecipeSOPService.getSummaryByControlRecipeId(controlRecipeId);
        return ResponseEntity.ok(ApiResponse.success("Recipe SOP summary fetched successfully.", response));
    }

}
