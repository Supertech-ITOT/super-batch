package com.supertech.superbatch.batch.batch.entity;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Batch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String batchNo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Recipe masterRecipe;
    @ManyToOne(fetch = FetchType.LAZY)
    private ControlRecipe controlRecipe;

    @Enumerated(EnumType.STRING)
    private BatchStatus status;

    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("stepNo ASC")
    @Builder.Default
    private Set<BatchSOP> sops = new LinkedHashSet<>();

}
