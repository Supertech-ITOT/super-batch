package com.supertech.superbatch.common.controller;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.common.dto.OptionDto;
import com.supertech.superbatch.common.enums.StatusType;
import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.common.util.EnumUtil;
import com.supertech.superbatch.plant.enums.EquipmentType;
import com.supertech.superbatch.plant.enums.UnitType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/metadata")
@CrossOrigin("*")
public class MetadataController {

    @GetMapping("/equipment-types")
    public ResponseEntity<ApiResponse<List<OptionDto>>> getEquipmentTypes() {
        List<OptionDto> data = Arrays.stream(EquipmentType.values()).map(type -> new OptionDto(
                EnumUtil.formatLabel(type.name()),
                type.name()))
                .toList();
        return ResponseEntity.ok(ApiResponse.success("Equipment types fetched successfully", data));
    }

    @GetMapping("/unit-types")
    public ResponseEntity<ApiResponse<List<OptionDto>>> getUnitTypes() {
        List<OptionDto> data = Arrays.stream(UnitType.values()).map(type -> new OptionDto(
                EnumUtil.formatLabel(type.name()),
                type.name()))
                .toList();
        return ResponseEntity.ok(ApiResponse.success("Unit types fetched successfully", data));

    }

    @GetMapping("/status-types")
    public ResponseEntity<ApiResponse<List<OptionDto>>> getStatusType() {

        List<OptionDto> data = Arrays.stream(StatusType.values()).map(type -> new OptionDto(
                EnumUtil.formatLabel(type.name()),
                type.name()))
                .toList();

        return ResponseEntity.ok(ApiResponse.success("Status types fetched successfully", data));
    }

    @GetMapping("/uom-types")
    public ResponseEntity<ApiResponse<List<OptionDto>>> getUomTypes() {

        List<OptionDto> data = Arrays.stream(UomType.values())
                .map(type -> new OptionDto(type.name(), type.getSymbol()))
                .toList();

        return ResponseEntity.ok(ApiResponse.success("UOM types fetched successfully", data));
    }
}