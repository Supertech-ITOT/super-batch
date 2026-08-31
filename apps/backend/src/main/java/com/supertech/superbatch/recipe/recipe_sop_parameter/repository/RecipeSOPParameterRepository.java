package com.supertech.superbatch.recipe.recipe_sop_parameter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_parameter.entity.RecipeSOPParameter;

public interface RecipeSOPParameterRepository extends JpaRepository<RecipeSOPParameter, Long> {
    void deleteAllByRecipeSOP(RecipeSOP recipeSOP);

    @Query("""
            SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END
            FROM RecipeSOPParameter p
            JOIN p.recipeSOP s
            JOIN s.recipe r
            WHERE r.deleted = false
              AND p.parameter.id = :parameterId
            """)
    boolean existsByActiveRecipeAndParameterId(Long parameterId);
}
