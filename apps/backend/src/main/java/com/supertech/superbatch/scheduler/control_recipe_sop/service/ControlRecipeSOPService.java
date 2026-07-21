package com.supertech.superbatch.scheduler.control_recipe_sop.service;

import java.util.List;

import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPSummaryResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.CreateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.UpdateControlRecipeSOPRequest;

public interface ControlRecipeSOPService {
    ControlRecipeSOPResponse getById(Long id);

    List<ControlRecipeSOPResponse> getAllByControlRecipeId(Long controlRecipeId);

    void create(CreateControlRecipeSOPRequest request);

    void update(UpdateControlRecipeSOPRequest request);

    void delete(Long id);

    void moveUp(Long controlRecipeId);

    void moveDown(Long controlRecipeId);

    void insertAbove(Long controlRecipeId, CreateControlRecipeSOPRequest request);

    void insertBelow(Long controlRecipeId, CreateControlRecipeSOPRequest request);

    ControlRecipeSOPSummaryResponse getSummaryByControlRecipeId(Long controlRecipeId);

}
