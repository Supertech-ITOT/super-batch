package com.supertech.superbatch.sample_check.batch_check.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.sample_check.batch_check.entity.BatchCheck;

public interface BatchCheckRepository extends JpaRepository<BatchCheck, Long> {

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

}
