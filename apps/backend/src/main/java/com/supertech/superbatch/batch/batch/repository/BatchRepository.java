package com.supertech.superbatch.batch.batch.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;

public interface BatchRepository extends JpaRepository<Batch, Long> {

        Optional<Batch> findByBatchNo(String batchNo);

        @EntityGraph(attributePaths = {
                        "controlRecipe",
                        "controlRecipe.recipe",
                        "controlRecipe.recipe.material",
                        "controlRecipe.unit",
                        "controlRecipe.shiftIncharge",
                        "controlRecipe.createdBy",
        })
        Optional<Batch> findWithRecipeInfoByBatchNo(String batchNo);

        List<Batch> findByUnit_CodeAndStatusOrderByCreatedAtDesc(
                        String unitCode,
                        BatchStatus status);

        @Query("""
                            SELECT b.status, COUNT(b)
                            FROM Batch b
                            GROUP BY b.status
                        """)
        List<Object[]> countByStatus();

        @EntityGraph(attributePaths = {
                        "masterRecipe.material", "unit", "sops"
        })
        List<Batch> findByStatusInOrderByStartDateTimeAsc(List<BatchStatus> statuses);

        @EntityGraph(attributePaths = { "masterRecipe", "controlRecipe", "unit", "sops" })
        @Query("""
                        SELECT b
                        FROM Batch b
                        WHERE b.id = :batchId
                        """)
        Optional<Batch> findForAbortById(@Param("batchId") Long batchId);

}
