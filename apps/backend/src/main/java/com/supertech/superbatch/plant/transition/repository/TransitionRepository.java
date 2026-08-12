package com.supertech.superbatch.plant.transition.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.transition.entity.Transition;

public interface TransitionRepository extends JpaRepository<Transition, Long> {
    boolean existsByNameIgnoreCaseAndDeletedFalse(String name);

    List<Transition> findAllByDeletedFalse(Sort sort);

    Optional<Transition> findByIdAndDeletedFalse(Long id);

}