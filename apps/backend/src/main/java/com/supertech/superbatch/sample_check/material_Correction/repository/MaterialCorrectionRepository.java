package com.supertech.superbatch.sample_check.material_correction.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.sample_check.material_correction.dto.projection.CorrectionQuantityDetailProjection;
import com.supertech.superbatch.sample_check.material_correction.dto.projection.CorrectionQuantitySummaryProjection;
import com.supertech.superbatch.sample_check.material_correction.entity.MaterialCorrection;

public interface MaterialCorrectionRepository extends JpaRepository<MaterialCorrection, Long> {
        @EntityGraph(attributePaths = { "batch", "batchSOP", "material" })
        List<MaterialCorrection> findByBatch_BatchNoAndBatchSOP_StepNoOrderByLoopAscSampleDateTimeAscIdAsc(
                        String batchNo,
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

        @Query("""
                            SELECT mc.batch.id, COALESCE(SUM(mc.qty), 0)
                            FROM MaterialCorrection mc
                            WHERE mc.batch.id IN :batchIds
                            GROUP BY mc.batch.id
                        """)
        List<Object[]> getTotalQtyByBatchIds(@Param("batchIds") List<Long> batchIds);

        @Query("""
                        SELECT COALESCE(SUM(mc.qty), 0)
                        FROM MaterialCorrection mc
                        WHERE mc.batch.id = :batchId
                        """)
        Double getTotalQtyByBatchId(@Param("batchId") Long batchId);

        @Query("""
                        SELECT
                            m.id AS materialId,
                            m.name AS materialName,
                            m.code AS materialCode,
                            SUM(mc.qty) AS qty
                        FROM MaterialCorrection mc
                        JOIN mc.material m
                        WHERE mc.batch.id = :batchId
                        GROUP BY m.id, m.name, m.code
                        ORDER BY m.name
                        """)
        List<CorrectionQuantitySummaryProjection> findCorrectionQuantityGroupedByBatchId(
                        @Param("batchId") Long batchId);

        @Query("""
                        SELECT
                            sop.stepNo AS stepNo,
                            mc.loop AS loop,
                            mc.sampleDateTime AS dateTime,
                            m.id AS materialId,
                            m.name AS materialName,
                            m.code AS materialCode,
                            mc.qty AS qty
                        FROM MaterialCorrection mc
                        JOIN mc.material m
                        JOIN mc.batchSOP sop
                        WHERE mc.batch.id = :batchId
                        ORDER BY sop.stepNo, mc.loop
                        """)
        List<CorrectionQuantityDetailProjection> findCorrectionQuantityDetailByBatchId(@Param("batchId") Long batchId);
}
