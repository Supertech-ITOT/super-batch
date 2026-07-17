package com.supertech.superbatch.manager.module.service;

import java.util.List;

import com.supertech.superbatch.manager.module.dto.ModuleResponse;

public interface ModuleService {
    List<ModuleResponse> getAll();
}
