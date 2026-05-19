package com.supertech.superbatch.common.controller;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.common.dto.OptionDto;
import com.supertech.superbatch.common.util.EnumUtil;
import com.supertech.superbatch.plant.enums.EquipmentType;
import com.supertech.superbatch.plant.enums.UnitType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
public class MetadataController {

    @GetMapping("/api/metadata/equipment-types")
    public ResponseEntity<ApiResponse<List<OptionDto>>> getEquipmentTypes() {
        List<OptionDto> data = Arrays.stream(EquipmentType.values()).map(type -> new OptionDto(
                EnumUtil.formatLabel(type.name()),
                type.name()))
                .toList();
        return ResponseEntity.ok(ApiResponse.success("Equipment types fetched successfully", data));
    }

    @GetMapping("/api/metadata/unit-types")
    public ResponseEntity<ApiResponse<List<OptionDto>>> getUnitTypes() {
        List<OptionDto> data = Arrays.stream(UnitType.values()).map(type -> new OptionDto(
                EnumUtil.formatLabel(type.name()),
                type.name()))
                .toList();

        return ResponseEntity.ok(ApiResponse.success("Unit types fetched successfully", data));
    }
}