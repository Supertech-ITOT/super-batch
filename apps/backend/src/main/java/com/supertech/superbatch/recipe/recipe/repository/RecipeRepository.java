package com.supertech.superbatch.recipe.recipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("""
                SELECT rh
                FROM Recipe rh
                LEFT JOIN FETCH rh.material
                LEFT JOIN FETCH rh.unit u
                LEFT JOIN FETCH rh.createdBy
                ORDER BY rh.id
            """)
    List<Recipe> findAllWithRelations();

    @Query("""
                SELECT rh
                FROM Recipe rh
                LEFT JOIN FETCH rh.material
                LEFT JOIN FETCH rh.unit u
                LEFT JOIN FETCH rh.createdBy
                WHERE rh.id = :id

            """)
    Optional<Recipe> findByIdWithRelations(Long id);

    boolean existsByNameIgnoreCase(String name);

}
