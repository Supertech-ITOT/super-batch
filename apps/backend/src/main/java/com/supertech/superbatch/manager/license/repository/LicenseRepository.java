package com.supertech.superbatch.manager.license.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.manager.license.entity.License;

public interface LicenseRepository extends JpaRepository<License, Long> {

}
