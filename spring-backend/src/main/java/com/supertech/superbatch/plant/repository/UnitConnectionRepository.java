package com.supertech.superbatch.plant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.plant.entity.UnitConnection;

public interface UnitConnectionRepository extends JpaRepository<UnitConnection, Long> {

    Optional<UnitConnection> findBySourceUnitIdAndDestinationUnitId(
            Long sourceUnitId,
            Long destinationUnitId);

    boolean existsBySourceUnitIdAndDestinationUnitId(
            Long sourceUnitId,
            Long destinationUnitId);
}