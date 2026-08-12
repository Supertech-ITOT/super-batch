package com.supertech.superbatch.plant.parameter.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.parameter.entity.Parameter;

public interface ParameterRepository extends JpaRepository<Parameter, Long> {
    boolean existsByNameIgnoreCaseAndDeletedFalse(String name);

    List<Parameter> findAllByDeletedFalse(Sort sort);

    Optional<Parameter> findByIdAndDeletedFalse(Long id);

}
