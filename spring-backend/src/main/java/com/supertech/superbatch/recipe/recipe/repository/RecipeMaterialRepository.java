package com.supertech.superbatch.recipe.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.recipe.recipe.entity.RecipeMaterial;

public interface RecipeMaterialRepository extends JpaRepository<RecipeMaterial, Long> {

}
