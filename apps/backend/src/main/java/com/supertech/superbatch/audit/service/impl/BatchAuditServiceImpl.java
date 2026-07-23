package com.supertech.superbatch.audit.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.entity.BatchAudit;
import com.supertech.superbatch.audit.mapper.BatchAuditMapper;
import com.supertech.superbatch.audit.repository.BatchAuditRepository;
import com.supertech.superbatch.audit.service.BatchAuditService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BatchAuditServiceImpl implements BatchAuditService {
    private final BatchAuditRepository batchAuditRepository;
    private final BatchAuditMapper batchAuditMapper;

    @Override
    public void save(BatchAudit batchAudit) {
        batchAuditRepository.save(batchAudit);

    }

    @Override
    public List<BatchAuditResponse> getAll() {
        return batchAuditRepository.findAll().stream().map(batchAuditMapper::toResponse).toList();
    }

}
