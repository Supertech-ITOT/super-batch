package com.supertech.superbatch.manager.module.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.module.dto.ModuleResponse;
import com.supertech.superbatch.manager.module.entity.Module;

@Component
public class ModuleMapper {
    public ModuleResponse toResponse(Module module) {
        return ModuleResponse.builder()
                .id(module.getId())
                .name(module.getName())
                .build();
    }
}
