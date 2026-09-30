package com.supertech.superbatch.batch.batch.repository;

import java.time.LocalDateTime;
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
                WHERE b.createdAt >= :start AND b.createdAt < :end
                GROUP BY b.status
            """)
    List<Object[]> countByStatus(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
