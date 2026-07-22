package com.supertech.superbatch.recipe.recipe_sop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;

public interface RecipeSOPRepository extends JpaRepository<RecipeSOP, Long> {
  List<RecipeSOP> findAllByRecipeId(Long recipeId);

  Optional<RecipeSOP> findByRecipeIdAndStepNo(Long recipeId, Integer stepNo);

  @Modifying
  @Query("""
          UPDATE RecipeSOP r
          SET r.stepNo = r.stepNo - 1
          WHERE r.recipe.id = :recipeId
            AND r.stepNo > :stepNo
      """)
  void decrementStepNumbers(Long recipeId, Integer stepNo);

  // Insert Below
  @Modifying
  @Query("""
          UPDATE RecipeSOP r
          SET r.stepNo = r.stepNo + 1
          WHERE r.recipe.id = :recipeId
            AND r.stepNo > :stepNo
      """)
  void incrementStepNumbersAfter(Long recipeId, Integer stepNo);

  // Insert Above
  @Modifying
  @Query("""
          UPDATE RecipeSOP r
          SET r.stepNo = r.stepNo + 1
          WHERE r.recipe.id = :recipeId
            AND r.stepNo >= :stepNo
      """)
  void incrementStepNumbersFrom(Long recipeId, Integer stepNo);

  @EntityGraph(attributePaths = { "recipe", "action", "transition", "fromEquipment", "toEquipment", "materials",
      "materials.material", "parameters", "parameters.parameter" })
  Optional<RecipeSOP> findWithRelationsById(Long id);

  @EntityGraph(attributePaths = { "recipe", "action", "transition", "fromEquipment", "toEquipment", "materials",
      "materials.material", "parameters", "parameters.parameter" })
  List<RecipeSOP> findWithRelationsByRecipeId(Long recipeId);

}
