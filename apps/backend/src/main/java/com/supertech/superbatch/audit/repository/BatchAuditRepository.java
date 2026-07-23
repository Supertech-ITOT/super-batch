package com.supertech.superbatch.audit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.audit.entity.BatchAudit;

public interface BatchAuditRepository extends JpaRepository<BatchAudit, Long> {

}
