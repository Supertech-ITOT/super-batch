package com.supertech.superbatch.scheduler.control_recipe_sop_material.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;

public interface ControlRecipeSOPMaterialRepository extends JpaRepository<ControlRecipeSOPMaterial, Long> {
    void deleteAllByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP);

    @Query("""
                SELECT COALESCE(SUM(rm.stdQty), 0)
                FROM ControlRecipeSOPMaterial rm
                WHERE rm.controlRecipeSOP.controlRecipe.id = :controlRecipeId
            """)
    Double getTotalMaterialQtyByControlRecipeId(Long controlRecipeId);

    @Query("""
            select coalesce(sum(m.stdQty),0)
            from ControlRecipeSOPMaterial m
            where m.controlRecipeSOP.id = :controlRecipeSOPId
            """)
    double getTotalMaterialQtyByControlRecipeSOPId(Long controlRecipeSOPId);

}
