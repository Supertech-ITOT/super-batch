package com.supertech.superbatch.scheduler.control_recipe_sop_parameter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;

public interface ControlRecipeSOPParameterRepository extends JpaRepository<ControlRecipeSOPParameter, Long> {
    void deleteAllByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP);

    @EntityGraph(attributePaths = { "parameter" })
    List<ControlRecipeSOPParameter> findAllByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP);

}
