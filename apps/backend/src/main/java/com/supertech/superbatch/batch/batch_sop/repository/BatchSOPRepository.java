package com.supertech.superbatch.batch.batch_sop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;

public interface BatchSOPRepository extends JpaRepository<BatchSOP, Long> {

    @EntityGraph(attributePaths = {
            "batch",
            "transition",
            "action",
            "fromEquipment",
            "toEquipment",
            "materials",
            "materials.material",
            "parameters",
            "parameters.parameter"
    })
    Optional<BatchSOP> findByBatch_BatchNoAndStepNo(
            String batchNo,
            Integer stepNo);
}
