package com.supertech.superbatch.recipe.recipe_sop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;

public interface RecipeSOPRepository extends JpaRepository<RecipeSOP, Long> {
  List<RecipeSOP> findAllByRecipeHeaderId(Long recipeHeaderId);

  Optional<RecipeSOP> findByRecipeHeaderIdAndStepNo(Long recipeHeaderId, Integer stepNo);

  @Modifying
  @Query("""
          UPDATE RecipeSOP r
          SET r.stepNo = r.stepNo - 1
          WHERE r.recipeHeader.id = :recipeHeaderId
            AND r.stepNo > :stepNo
      """)
  void decrementStepNumbers(Long recipeHeaderId, Integer stepNo);

  // Insert Below
  @Modifying
  @Query("""
          UPDATE RecipeSOP r
          SET r.stepNo = r.stepNo + 1
          WHERE r.recipeHeader.id = :recipeHeaderId
            AND r.stepNo > :stepNo
      """)
  void incrementStepNumbersAfter(Long recipeHeaderId, Integer stepNo);

  // Insert Above
  @Modifying
  @Query("""
          UPDATE RecipeSOP r
          SET r.stepNo = r.stepNo + 1
          WHERE r.recipeHeader.id = :recipeHeaderId
            AND r.stepNo >= :stepNo
      """)
  void incrementStepNumbersFrom(Long recipeHeaderId, Integer stepNo);

  @EntityGraph(attributePaths = { "recipeHeader", "action", "transition", "fromEquipment", "toEquipment" })
  Optional<RecipeSOP> findWithRelationsById(Long id);

  @EntityGraph(attributePaths = { "recipeHeader", "action", "transition", "fromEquipment", "toEquipment" })
  List<RecipeSOP> findWithRelationsByRecipeHeaderId(Long recipeHeaderId);

}
