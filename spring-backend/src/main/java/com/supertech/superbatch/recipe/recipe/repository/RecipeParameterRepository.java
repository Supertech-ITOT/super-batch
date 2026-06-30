package com.supertech.superbatch.recipe.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.recipe.recipe.entity.RecipeParameter;

public interface RecipeParameterRepository extends JpaRepository<RecipeParameter, Long> {

}
