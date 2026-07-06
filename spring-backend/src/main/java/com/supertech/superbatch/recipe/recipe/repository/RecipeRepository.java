package com.supertech.superbatch.recipe.recipe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
  List<Recipe> findAllByRecipeHeaderId(Long recipeHeaderId);

  Optional<Recipe> findByRecipeHeaderIdAndStepNo(Long recipeHeaderId, Integer stepNo);

  @Modifying
  @Query("""
          UPDATE Recipe r
          SET r.stepNo = r.stepNo - 1
          WHERE r.recipeHeader.id = :recipeHeaderId
            AND r.stepNo > :stepNo
      """)
  void decrementStepNumbers(Long recipeHeaderId, Integer stepNo);

  // Insert Below
  @Modifying
  @Query("""
          UPDATE Recipe r
          SET r.stepNo = r.stepNo + 1
          WHERE r.recipeHeader.id = :recipeHeaderId
            AND r.stepNo > :stepNo
      """)
  void incrementStepNumbersAfter(Long recipeHeaderId, Integer stepNo);

  // Insert Above
  @Modifying
  @Query("""
          UPDATE Recipe r
          SET r.stepNo = r.stepNo + 1
          WHERE r.recipeHeader.id = :recipeHeaderId
            AND r.stepNo >= :stepNo
      """)
  void incrementStepNumbersFrom(Long recipeHeaderId, Integer stepNo);

  @EntityGraph(attributePaths = { "recipeHeader", "action", "transition" })
  Optional<Recipe> findWithRelationsById(Long id);

  @EntityGraph(attributePaths = { "recipeHeader", "action", "transition" })
  List<Recipe> findWithRelationsByRecipeHeaderId(Long recipeHeaderId);

}
