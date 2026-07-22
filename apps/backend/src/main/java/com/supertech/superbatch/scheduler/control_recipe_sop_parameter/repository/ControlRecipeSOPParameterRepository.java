package com.supertech.superbatch.scheduler.control_recipe_sop_parameter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;

public interface ControlRecipeSOPParameterRepository extends JpaRepository<ControlRecipeSOPParameter, Long> {
    void deleteAllByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP);

}
