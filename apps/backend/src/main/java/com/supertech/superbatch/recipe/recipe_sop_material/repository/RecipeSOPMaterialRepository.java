package com.supertech.superbatch.recipe.recipe_sop_material.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;

public interface RecipeSOPMaterialRepository extends JpaRepository<RecipeSOPMaterial, Long> {
    void deleteAllByRecipeSOP(RecipeSOP recipe);

    @EntityGraph(attributePaths = { "material" })
    List<RecipeSOPMaterial> findAllByRecipeSOP(RecipeSOP recipe);

    @EntityGraph(attributePaths = "material")
    List<RecipeSOPMaterial> findByRecipeSOPRecipeId(Long recipeId);

    @Query("""
                SELECT COALESCE(SUM(rm.stdQty), 0)
                FROM RecipeSOPMaterial rm
                WHERE rm.recipeSOP.recipe.id = :recipeId
            """)
    Double getTotalMaterialQtyByRecipeId(Long recipeId);

    @Query("""
            select coalesce(sum(m.stdQty),0)
            from RecipeSOPMaterial m
            where m.recipeSOP.id = :recipeSOPId
            """)
    double getTotalMaterialQtyByRecipeSOPId(Long recipeSOPId);
}
