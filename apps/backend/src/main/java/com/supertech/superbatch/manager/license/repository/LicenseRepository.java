package com.supertech.superbatch.manager.license.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.manager.license.entity.License;
import com.supertech.superbatch.manager.license.enums.LicenseStatus;

public interface LicenseRepository extends JpaRepository<License, Long> {
    Optional<License> findByStatus(LicenseStatus status);

    boolean existsByStatus(LicenseStatus status);
}
