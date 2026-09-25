package com.supertech.superbatch.sample_check.material_correction.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.sample_check.material_correction.entity.MaterialCorrection;

public interface MaterialCorrectionRepository extends JpaRepository<MaterialCorrection, Long> {
  @EntityGraph(attributePaths = { "batch", "batchSOP", "material" })
  List<MaterialCorrection> findByBatch_BatchNoAndBatchSOP_StepNoOrderByLoopAscSampleDateTimeAscIdAsc(String batchNo,
      Integer stepNo);

  @Query("""
      SELECT COALESCE(MAX(mc.loop), 0)
      FROM MaterialCorrection mc
      WHERE mc.batch.id = :batchId
        AND mc.batchSOP.id = :batchSOPId
        AND mc.material.id = :materialId
      """)
  Integer findMaxLoopByBatchIdAndBatchSOPIdAndMaterialId(
      @Param("batchId") Long batchId,
      @Param("batchSOPId") Long batchSOPId,
      @Param("materialId") Long materialId);
}
