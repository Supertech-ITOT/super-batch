package com.supertech.superbatch.sample_check.batch_check_result.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.sample_check.batch_check_result.entity.BatchCheckResult;

public interface BatchCheckResultRepository extends JpaRepository<BatchCheckResult, Long> {
  @Query("""
      SELECT COALESCE(MAX(r.loop), 0)
      FROM BatchCheckResult r
      WHERE r.batchCheck.batch.id = :batchId
        AND r.batchCheck.batchSOP.id = :batchSOPId
        AND r.checkParameter.id = :checkParameterId
      """)
  Integer findMaxLoopByBatchIdAndBatchSOPIdAndCheckParameterId(
      @Param("batchId") Long batchId,
      @Param("batchSOPId") Long batchSOPId,
      @Param("checkParameterId") Long checkParameterId);

  @EntityGraph(attributePaths = {
      "batchCheck",
      "batchCheck.batch",
      "batchCheck.batchSOP",
      "checkParameter"
  })
  List<BatchCheckResult> findByBatchCheck_Batch_BatchNoAndBatchCheck_BatchSOP_StepNoOrderByLoopAscBatchCheck_SampleDateTimeAscIdAsc(
      String batchNo,
      Integer stepNo);

}
