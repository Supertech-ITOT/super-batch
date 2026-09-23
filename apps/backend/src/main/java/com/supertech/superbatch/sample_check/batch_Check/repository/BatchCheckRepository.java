package com.supertech.superbatch.sample_check.batch_check.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.sample_check.batch_check.entity.BatchCheck;

public interface BatchCheckRepository extends JpaRepository<BatchCheck, Long> {
    @EntityGraph(attributePaths = { "batch", "batchSOP", "results", "results.checkParameter" })
    List<BatchCheck> findByBatch_BatchNoOrderBySampleDateTimeAsc(String batchNo);

}
