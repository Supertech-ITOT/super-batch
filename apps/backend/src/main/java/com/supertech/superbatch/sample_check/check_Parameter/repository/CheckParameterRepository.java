package com.supertech.superbatch.sample_check.check_parameter.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;

public interface CheckParameterRepository extends JpaRepository<CheckParameter, Long> {
    @EntityGraph(attributePaths = { "checkParameterOptions", "material" })
    Optional<CheckParameter> findByIdAndDeletedFalse(Long id);

    @EntityGraph(attributePaths = { "checkParameterOptions", "material" })
    List<CheckParameter> findAllByDeletedFalseOrderByNameAsc();

    @EntityGraph(attributePaths = { "checkParameterOptions", "material" })
    List<CheckParameter> findAllByMaterialIdAndDeletedFalseOrderByNameAsc(Long materialId);

}
