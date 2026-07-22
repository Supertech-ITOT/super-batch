package com.supertech.superbatch.recipe.recipe_sop_parameter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_parameter.entity.RecipeSOPParameter;

public interface RecipeSOPParameterRepository extends JpaRepository<RecipeSOPParameter, Long> {
    void deleteAllByRecipeSOP(RecipeSOP recipeSOP);
}
