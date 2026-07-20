package com.supertech.superbatch.scheduler.controlrecipe_sop.service.impl;

import java.util.List;

import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.common.mapper.UomMapper;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;
import com.supertech.superbatch.scheduler.control_recipe.repository.ControlRecipeRepository;
import com.supertech.superbatch.scheduler.controlrecipe_sop.mapper.ControlRecipeSOPMapper;
import com.supertech.superbatch.scheduler.controlrecipe_sop.repository.ControlSOPRepositpory;
import com.supertech.superbatch.scheduler.controlrecipe_sop.service.ControlRecipeSOPService;

public class ControlRecipeSOPServiceImpl implements ControlRecipeSOPService {
    private final ControlSOPRepositpory controlSOPRepositpory;
    private final ControlRecipeRepository controlRecipeRepository;
    private final ControlRecipeSOPMapper controlRecipeSOPMapper;
    private final ActionRepository actionRepository;
    private final EquipmentRepository equipmentRepository;
    private final TransitionRepository transitionRepository;
    private final RecipeSOPParameterService recipeSOPParameterService;
    private final RecipeSOPMaterialService recipeSOPMaterialService;
    private final RecipeSOPMaterialRepository recipeSOPMaterialRepository;
    private final UomMapper uomMapper;

    @Override
    public ControlRecipeSOPResponse getById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }

    @Override
    public List<ControlRecipeSOPResponse> getAllByControlRecipeId(Long controlRecipeId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllByControlRecipeId'");
    }

    @Override
    public void create(CreateControlRecipeSOPRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public void update(UpdateControlRecipeSOPRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public void moveUp(Long controlRecipeId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'moveUp'");
    }

    @Override
    public void moveDown(Long controlRecipeId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'moveDown'");
    }

    @Override
    public void insertAbove(Long controlRecipeId, CreateControlRecipeSOPRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'insertAbove'");
    }

    @Override
    public void insertBelow(Long controlRecipeId, CreateControlRecipeSOPRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'insertBelow'");
    }

    @Override
    public RecipeSOPSummaryResponse getSummaryByRecipeId(Long controlRecipeId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getSummaryByRecipeId'");
    }

}
