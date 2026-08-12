package com.supertech.superbatch.plant.action.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.action.entity.Action;

public interface ActionRepository extends JpaRepository<Action, Long> {
    boolean existsByNameIgnoreCaseAndDeletedFalse(String name);

    List<Action> findAllByDeletedFalse(Sort sort);

    Optional<Action> findByIdAndDeletedFalse(Long id);

}
