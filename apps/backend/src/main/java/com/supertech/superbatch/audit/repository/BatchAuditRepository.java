package com.supertech.superbatch.audit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.supertech.superbatch.audit.entity.BatchAudit;

public interface BatchAuditRepository extends JpaRepository<BatchAudit, Long> {
    @Override
    @EntityGraph(attributePaths = { "performedBy", "performedBy.role" })
    List<BatchAudit> findAll();
}
