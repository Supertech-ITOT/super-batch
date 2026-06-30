package com.supertech.superbatch.recipe.recipe_header.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;

public interface RecipeHeaderRepository extends JpaRepository<RecipeHeader, Long> {
    @Query("""
                SELECT rh
                FROM RecipeHeader rh
                LEFT JOIN FETCH rh.material
                LEFT JOIN FETCH rh.unit u
                LEFT JOIN FETCH rh.createdBy
                ORDER BY rh.id
            """)
    List<RecipeHeader> findAllWithRelations();

    @Query("""
                SELECT rh
                FROM RecipeHeader rh
                LEFT JOIN FETCH rh.material
                LEFT JOIN FETCH rh.unit u
                LEFT JOIN FETCH rh.createdBy
                WHERE rh.id = :id

            """)
    Optional<RecipeHeader> findByIdWithRelations(Long id);

    boolean existsByNameIgnoreCase(String name);

}
