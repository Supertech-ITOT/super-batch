package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.PlantHierarchy.PlantHierarchyResponse;
import com.supertech.superbatch.plant.service.PlantHierarchyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plant")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PlantHierarchyController {

    private final PlantHierarchyService plantHierarchyService;

    @GetMapping("/hierarchy")
    public ResponseEntity<ApiResponse<List<PlantHierarchyResponse>>> getHierarchy() {
        List<PlantHierarchyResponse> hierarchyResponse = plantHierarchyService.getHierarchy();
        return ResponseEntity.ok(
                ApiResponse.success("Plant hierarchy fetched successfully", hierarchyResponse));
    }
}
