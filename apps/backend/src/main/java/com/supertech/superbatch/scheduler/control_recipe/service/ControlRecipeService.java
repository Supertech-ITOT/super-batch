package com.supertech.superbatch.scheduler.control_recipe.service;

import java.util.List;

import com.supertech.superbatch.scheduler.control_recipe.dto.ControlRecipeResponse;
import com.supertech.superbatch.scheduler.control_recipe.dto.CreateControlRecipeRequest;
import com.supertech.superbatch.scheduler.control_recipe.dto.UpdateControlRecipeRequest;

public interface ControlRecipeService {
    void create(CreateControlRecipeRequest request, Long userId);

    List<ControlRecipeResponse> getAll();

    ControlRecipeResponse getById(Long id);

    void update(Long id, UpdateControlRecipeRequest request);

    void delete(Long id);

}
