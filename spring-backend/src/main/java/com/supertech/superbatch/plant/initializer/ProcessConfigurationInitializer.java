package com.supertech.superbatch.plant.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.entity.Action;
import com.supertech.superbatch.plant.entity.Parameter;
import com.supertech.superbatch.plant.entity.Transition;
import com.supertech.superbatch.plant.enums.ActionType;
import com.supertech.superbatch.plant.enums.ParameterType;
import com.supertech.superbatch.plant.enums.TransitionType;
import com.supertech.superbatch.plant.repository.ActionRepository;
import com.supertech.superbatch.plant.repository.ParameterRepository;
import com.supertech.superbatch.plant.repository.TransitionRepository;

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
            action.setId(type.getId());
            action.setCode(type.name());
            action.setName(type.getDisplayName());
            action.setActive(true);
            actionRepository.save(action);
        }

    }

    private void seedTransitions() {
        if (transitionRepository.count() > 0) {
            return;
        }
        for (TransitionType type : TransitionType.values()) {
            Transition transition = new Transition();
            transition.setId(type.getId());
            transition.setCode(type.name());
            transition.setName(type.getDisplayName());
            transition.setActive(true);
            transitionRepository.save(transition);
        }

    }

    private void seedParameters() {
        if (parameterRepository.count() > 0) {
            return;
        }
        for (ParameterType type : ParameterType.values()) {
            Parameter parameter = new Parameter();
            parameter.setId(type.getId());
            parameter.setCode(type.name());
            parameter.setName(type.getDisplayName());
            parameter.setUom(type.getDefaultUom());
            parameter.setActive(true);
            parameterRepository.save(parameter);
        }

    }

}
