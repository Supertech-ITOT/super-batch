package com.supertech.superbatch.plant.material.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.material.entity.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {

    boolean existsByNameIgnoreCaseAndDeletedFalse(String name);

    boolean existsByCodeIgnoreCaseAndDeletedFalse(String code);

    List<Material> findAllByDeletedFalse(Sort sort);

    Optional<Material> findByIdAndDeletedFalse(Long id);
}
