package com.supertech.superbatch.plant.common.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.action.enums.ActionType;
import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.parameter.enums.ParameterType;
import com.supertech.superbatch.plant.parameter.repository.ParameterRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.enums.TransitionType;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;

import lombok.RequiredArgsConstructor;

@Component

@RequiredArgsConstructor

public class ProcessConfigurationInitializer implements CommandLineRunner {
    private final ActionRepository actionRepository;
    private final TransitionRepository transitionRepository;
    private final ParameterRepository parameterRepository;

    @Override
    public void run(String... args) {
        seedActions();
        seedTransitions();
        seedParameters();
    }

    private void seedActions() {
        if (actionRepository.count() > 0) {
            return;
        }
        for (ActionType type : ActionType.values()) {
            Action action = new Action();
            action.setName(type.getDisplayName());
            action.setCanDelete(false);
            actionRepository.save(action);
        }

    }

    private void seedTransitions() {
        if (transitionRepository.count() > 0) {
            return;
        }
        for (TransitionType type : TransitionType.values()) {
            Transition transition = new Transition();
            transition.setName(type.getDisplayName());
            transition.setCanDelete(false);
            transitionRepository.save(transition);
        }

    }

    private void seedParameters() {
        if (parameterRepository.count() > 0) {
            return;
        }
        for (ParameterType type : ParameterType.values()) {
            Parameter parameter = new Parameter();
            parameter.setName(type.getDisplayName());
            parameter.setUom(type.getDefaultUom());
            parameterRepository.save(parameter);
        }

    }

}
