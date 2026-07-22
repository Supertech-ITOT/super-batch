package com.supertech.superbatch.scheduler.control_recipe.entity;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.scheduler.control_recipe.enums.ControlRecipeStatus;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ControlRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String batchNo;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Recipe recipe;

    @Enumerated(EnumType.STRING)
    private ControlRecipeStatus status;

    private Integer batchSize;

    @ManyToOne(fetch = FetchType.LAZY)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    private User shiftIncharge;

    private LocalDateTime scheduledAt;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "controlRecipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ControlRecipeSOP> sops = new LinkedHashSet<>();

}
