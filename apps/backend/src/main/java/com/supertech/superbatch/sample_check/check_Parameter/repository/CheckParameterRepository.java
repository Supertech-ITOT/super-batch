package com.supertech.superbatch.sample_check.check_parameter.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;

public interface CheckParameterRepository extends JpaRepository<CheckParameter, Long> {
    @EntityGraph(attributePaths = { "checkParameterOptions", "materials" })
    Optional<CheckParameter> findByIdAndDeletedFalse(Long id);

    @EntityGraph(attributePaths = { "checkParameterOptions", "materials" })
    List<CheckParameter> findAllByDeletedFalseOrderByNameAsc();

    @EntityGraph(attributePaths = { "checkParameterOptions", "materials" })
    List<CheckParameter> findDistinctByMaterials_IdAndDeletedFalseOrderByNameAsc(Long materialId);

    boolean existsByNameIgnoreCaseAndDeletedFalse(String name);

    boolean existsByNameIgnoreCaseAndDeletedFalseAndIdNot(String name, Long id);

}
