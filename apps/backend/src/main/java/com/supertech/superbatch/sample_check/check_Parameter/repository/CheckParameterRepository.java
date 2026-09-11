package com.supertech.superbatch.sample_check.check_Parameter.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.supertech.superbatch.sample_check.check_Parameter.entity.CheckParameter;

public interface CheckParameterRepository extends JpaRepository<CheckParameter, Long> {
    @EntityGraph(attributePaths = { "CheckParameterOptions", "Material" })
    Optional<CheckParameter> findByIdAndDeletedFalse(Long id);

    @EntityGraph(attributePaths = { "CheckParameterOptions", "Material" })
    List<CheckParameter> findAllByDeletedFalseOrderByNameAsc();

}
