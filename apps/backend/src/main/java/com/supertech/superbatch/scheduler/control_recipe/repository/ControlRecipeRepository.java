package com.supertech.superbatch.scheduler.control_recipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;

public interface ControlRecipeRepository extends JpaRepository<ControlRecipe, Long> {
    @Query("""
                SELECT rh
                FROM ControlRecipe crh
                LEFT JOIN FETCH crh.material
                LEFT JOIN FETCH crh.unit u
                LEFT JOIN FETCH crh.createdBy
                ORDER BY crh.id
            """)
    List<ControlRecipe> findAllWithRelations();

    @Query("""
                SELECT rh
                FROM ControlRecipe crh
                LEFT JOIN FETCH crh.material
                LEFT JOIN FETCH crh.unit u
                LEFT JOIN FETCH crh.createdBy
                WHERE crh.id = :id

            """)
    Optional<ControlRecipe> findByIdWithRelations(Long id);

    boolean existsByNameIgnoreCase(String name);

}
