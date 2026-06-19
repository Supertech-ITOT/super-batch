package com.supertech.superbatch.manager.module.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.manager.module.dto.ModuleResponse;
import com.supertech.superbatch.manager.module.mapper.ModuleMapper;
import com.supertech.superbatch.manager.module.repository.ModuleRepository;
import com.supertech.superbatch.manager.module.service.ModuleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService {
    private final ModuleMapper moduleMapper;
    private final ModuleRepository moduleRepository;

    @Override
    public List<ModuleResponse> getAll() {
        List<ModuleResponse> modules = moduleRepository.findAll().stream().map(moduleMapper::toResponse).toList();
        return modules;
    }

}
