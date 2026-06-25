package com.supertech.superbatch.recipe.recipe_header.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.recipe.recipe_header.entity.RecipeHeader;

public interface RecipeHeaderRepository extends JpaRepository<RecipeHeader, Long> {

}
