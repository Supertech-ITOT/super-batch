package com.supertech.superbatch.batch.batch_sop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.batch.batch_sop.dto.projection.MaterialQuantityDetailProjection;
import com.supertech.superbatch.batch.batch_sop.dto.projection.MaterialQuantitySummaryProjection;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop.enums.BatchSOPStatus;

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
    Optional<BatchSOP> findFirstByBatch_IdAndStatusOrderByStepNoDesc(
            Long batchId,
            BatchSOPStatus status);

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

    @Query("""
            SELECT
                m.id AS materialId,
                m.name AS materialName,
                m.code AS materialCode,
                SUM(sm.stdQty) AS stdQty,
                SUM(sm.actQty) AS actQty
            FROM BatchSOP sops
            JOIN sops.materials sm
            JOIN sm.material m
            WHERE sops.batch.id = :batchId
            GROUP BY m.id, m.name, m.code
            ORDER BY m.name
            """)
    List<MaterialQuantitySummaryProjection> findMaterialQuantityGroupedByBatchId(@Param("batchId") Long batchId);

    @Query("""
            SELECT
                sops.stepNo AS stepNo,
                sops.startDateTime AS startDateTime,
                sops.endDateTime AS endDateTime,
                m.id AS materialId,
                m.name AS materialName,
                m.code AS materialCode,
                CAST(sm.stdQty AS Double) AS stdQty,
                COALESCE(sm.actQty, 0.0) AS actQty,
                (COALESCE(sm.actQty, 0.0) - COALESCE(sm.stdQty, 0.0)) AS varQty,
                CASE
                    WHEN COALESCE(sm.stdQty, 0.0) = 0 THEN 0.0
                    ELSE ((COALESCE(sm.actQty, 0.0) - sm.stdQty) / sm.stdQty) * 100.0
                END AS varPct
            FROM BatchSOP sops
            JOIN sops.materials sm
            JOIN sm.material m
            WHERE sops.batch.id = :batchId
            ORDER BY sops.stepNo
            """)
    List<MaterialQuantityDetailProjection> findMaterialQuantityDetailByBatchId(
            @Param("batchId") Long batchId);
}
