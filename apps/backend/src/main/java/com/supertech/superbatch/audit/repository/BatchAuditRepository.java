package com.supertech.superbatch.audit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.supertech.superbatch.audit.entity.BatchAudit;

public interface BatchAuditRepository extends JpaRepository<BatchAudit, Long>, JpaSpecificationExecutor<BatchAudit> {
    @Override
    @EntityGraph(attributePaths = { "performedBy", "performedBy.role", "module" })
    List<BatchAudit> findAll();

    @Override
    @EntityGraph(attributePaths = { "performedBy", "performedBy.role", "module" })
    Optional<BatchAudit> findById(Long id);
}
