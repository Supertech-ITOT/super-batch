package com.supertech.superbatch.recipe.recipe_sop.service.impl;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;
import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;
import com.supertech.superbatch.recipe.recipe_header.repository.RecipeHeaderRepository;
import com.supertech.superbatch.recipe.recipe_sop.dto.CreateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPDependencies;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.UpdateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop.mapper.RecipeSOPMapper;
import com.supertech.superbatch.recipe.recipe_sop.repository.RecipeSOPRepository;
import com.supertech.superbatch.recipe.recipe_sop.service.RecipeSOPService;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeMaterialResponse;
import com.supertech.superbatch.recipe.recipe_sop_material.service.RecipeMaterialService;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeParameterResponse;
import com.supertech.superbatch.recipe.recipe_sop_parameter.service.RecipeParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeSOPServiceImpl implements RecipeSOPService {
        private final RecipeSOPRepository recipeSOPRepository;
        private final RecipeHeaderRepository recipeHeaderRepository;
        private final RecipeSOPMapper recipeSOPMapper;
        private final ActionRepository actionRepository;
        private final EquipmentRepository equipmentRepository;
        private final TransitionRepository transitionRepository;
        private final RecipeParameterService recipeParameterService;
        private final RecipeMaterialService recipeMaterialService;

        @Override
        public RecipeSOPResponse getById(Long id) {
                RecipeSOP recipeSOP = recipeSOPRepository.findWithRelationsById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                List<RecipeMaterialResponse> materials = recipeMaterialService.getAllByRecipe(recipeSOP);
                List<RecipeParameterResponse> parameters = recipeParameterService.getAllByRecipe(recipeSOP);
                return recipeSOPMapper.toResponse(recipeSOP, materials, parameters);
        }

        @Override
        public List<RecipeSOPResponse> getAllByRecipeHeaderId(Long recipeHeaderId) {
                List<RecipeSOP> recipeSOPs = recipeSOPRepository.findWithRelationsByRecipeHeaderId(recipeHeaderId);
                return recipeSOPs.stream()
                                .sorted(Comparator.comparing(RecipeSOP::getStepNo))
                                .map(
                                                recipeSOP -> recipeSOPMapper.toResponse(recipeSOP,
                                                                recipeMaterialService.getAllByRecipe(recipeSOP),
                                                                recipeParameterService.getAllByRecipe(recipeSOP)))
                                .toList();
        }

        @Override
        public void create(CreateRecipeSOPRequest request) {
                List<RecipeSOP> steps = recipeSOPRepository.findAllByRecipeHeaderId(request.recipeHeaderId());
                Integer stepNo = steps.isEmpty() ? 1 : steps.size() + 1;
                RecipeHeader recipeHeader = recipeHeaderRepository.findById(request.recipeHeaderId())
                                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found."));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
                RecipeSOP recipeSOP = recipeSOPMapper.toEntity(
                                request,
                                stepNo,
                                recipeHeader,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeSOPRepository.save(recipeSOP);
                recipeParameterService.create(recipeSOP, request.parameters());
                recipeMaterialService.create(recipeSOP, request.materials());
        }

        @Transactional
        @Override
        public void update(UpdateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(request.id())
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
                recipeSOPMapper.updateEntity(
                                request,
                                recipeSOP,
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeParameterService.update(recipeSOP, request.parameters());
                recipeMaterialService.update(recipeSOP, request.materials());
                recipeSOPRepository.save(recipeSOP);
        }

        @Transactional
        @Override
        public void delete(Long id) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                recipeParameterService.deleteByRecipe(recipeSOP);
                recipeMaterialService.deleteByRecipe(recipeSOP);
                recipeSOPRepository.decrementStepNumbers(
                                recipeSOP.getRecipeHeader().getId(),
                                recipeSOP.getStepNo());
                recipeSOPRepository.delete(recipeSOP);
        }

        @Transactional
        @Override
        public void moveUp(Long recipeId) {
                RecipeSOP current = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                if (current.getStepNo() == 1) {
                        throw new BadRequestException("Step 1 cannot be moved up.");
                }
                RecipeSOP previous = recipeSOPRepository.findByRecipeHeaderIdAndStepNo(
                                current.getRecipeHeader().getId(),
                                current.getStepNo() - 1)
                                .orElseThrow(() -> new ResourceNotFoundException("Previous step not found."));
                int temp = current.getStepNo();
                current.setStepNo(previous.getStepNo());
                previous.setStepNo(temp);
                recipeSOPRepository.save(current);
                recipeSOPRepository.save(previous);
        }

        @Transactional
        @Override
        public void moveDown(Long recipeId) {
                RecipeSOP current = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found."));
                RecipeSOP next = recipeSOPRepository.findByRecipeHeaderIdAndStepNo(
                                current.getRecipeHeader().getId(),
                                current.getStepNo() + 1)
                                .orElseThrow(() -> new ResourceNotFoundException("Next step not found."));
                int temp = current.getStepNo();
                current.setStepNo(next.getStepNo());
                next.setStepNo(temp);
                recipeSOPRepository.save(current);
                recipeSOPRepository.save(next);
        }

        @Transactional
        public void insertBelow(Long recipeId, CreateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
                recipeSOPRepository.incrementStepNumbersAfter(
                                recipeSOP.getRecipeHeader().getId(),
                                recipeSOP.getStepNo());
                RecipeSOP newRecipeSOP = recipeSOPMapper.toEntity(
                                request,
                                recipeSOP.getStepNo() + 1,
                                recipeSOP.getRecipeHeader(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeSOPRepository.save(newRecipeSOP);
        }

        @Transactional
        public void insertAbove(Long recipeId, CreateRecipeSOPRequest request) {
                RecipeSOP recipeSOP = recipeSOPRepository.findById(recipeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Step not found"));
                RecipeSOPDependencies deps = loadInsertDependencies(request.actionId(),
                                request.transitionId(),
                                request.fromEquipmentId(),
                                request.toEquipmentId(),
                                request.materials());
                recipeSOPRepository.incrementStepNumbersFrom(
                                recipeSOP.getRecipeHeader().getId(),
                                recipeSOP.getStepNo());
                RecipeSOP newRecipeSOP = recipeSOPMapper.toEntity(
                                request,
                                recipeSOP.getStepNo(),
                                recipeSOP.getRecipeHeader(),
                                deps.action(),
                                deps.transition(),
                                deps.fromEquipment(),
                                deps.toEquipment());
                recipeSOPRepository.save(newRecipeSOP);
        }

        private RecipeSOPDependencies loadInsertDependencies(
                        Long actionId,
                        Long transitionId,
                        Long fromEquipmentId,
                        Long toEquipmentId,
                        List<RecipeMaterialRequest> materials) {

                Action action = actionRepository.findById(actionId)
                                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));

                Transition transition = transitionRepository.findById(transitionId)
                                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));

                if (fromEquipmentId != null && fromEquipmentId.equals(toEquipmentId)) {
                        throw new BadRequestException("From Equipment and To Equipment cannot be same.");
                }

                Equipment fromEquipment = null;

                if (fromEquipmentId != null) {
                        fromEquipment = equipmentRepository.findById(fromEquipmentId)
                                        .orElseThrow(() -> new ResourceNotFoundException("From Equipment not found."));
                }

                Equipment toEquipment = equipmentRepository.findById(toEquipmentId)
                                .orElseThrow(() -> new ResourceNotFoundException("To Equipment not found."));

                recipeMaterialService.validate(transition, materials);

                return RecipeSOPDependencies.builder()
                                .action(action)
                                .transition(transition)
                                .fromEquipment(fromEquipment)
                                .toEquipment(toEquipment)
                                .build();
        }
}
