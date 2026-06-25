package com.supertech.superbatch.recipe.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.recipe.enums.RecipeStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer version;

    @Enumerated(EnumType.STRING)
    private RecipeStatus status;

    private Double batchSize;

    @Enumerated(EnumType.STRING)
    private UomType batchSizeUom;

    private String createdBy;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
