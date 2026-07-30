package com.supertech.superbatch.license.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.license.entity.License;

public interface LicenseRepository extends JpaRepository<License, Long> {

}
