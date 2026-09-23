package com.supertech.superbatch.sample_check.material_correction.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.sample_check.material_correction.entity.MaterialCorrection;

public interface MaterialCorrectionRepository extends JpaRepository<MaterialCorrection, Long> {
    @EntityGraph(attributePaths = { "batch", "batchSOP", "material" })
    List<MaterialCorrection> findByBatch_BatchNoOrderBySampleDateTimeAsc(String batchNo);
}
