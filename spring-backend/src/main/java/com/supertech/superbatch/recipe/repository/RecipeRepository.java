package com.supertech.superbatch.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.recipe.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

}
