package com.supertech.superbatch.recipe.recipe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findAllByRecipeHeaderId(Long recipeHeaderId);
}
