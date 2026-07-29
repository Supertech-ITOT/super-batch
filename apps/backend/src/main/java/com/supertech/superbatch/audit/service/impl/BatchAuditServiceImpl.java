package com.supertech.superbatch.audit.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.supertech.superbatch.audit.dto.AuditDiff;
import com.supertech.superbatch.audit.dto.BatchAuditRequest;
import com.supertech.superbatch.audit.dto.BatchAuditResponse;
import com.supertech.superbatch.audit.dto.BatchAuditSearchRequest;
import com.supertech.superbatch.audit.entity.BatchAudit;
import com.supertech.superbatch.audit.mapper.BatchAuditMapper;
import com.supertech.superbatch.audit.repository.BatchAuditRepository;
import com.supertech.superbatch.audit.service.AuditDiffGeneratorService;
import com.supertech.superbatch.audit.service.BatchAuditService;
import com.supertech.superbatch.audit.specification.BatchAuditSpecification;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.common.security.UserContextService;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BatchAuditServiceImpl implements BatchAuditService {
    private final BatchAuditRepository batchAuditRepository;
    private final BatchAuditMapper batchAuditMapper;
    private final UserContextService userContextService;
    private final UserRepository userRepository;
    private final AuditDiffGeneratorService auditDiffGeneratorService;

    @Override
    @Transactional
    public void save(BatchAuditRequest request) {
        Long userId = userContextService.getCurrentUserId();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found."));
        BatchAudit batchAudit = batchAuditMapper.toEntity(request, user);
        AuditDiff diff = auditDiffGeneratorService.generate(request.oldData(), request.newData());
        batchAudit.setOldData(diff.oldData());
        batchAudit.setNewData(diff.newData());
        batchAuditRepository.save(batchAudit);

    }

    @Override
    @Transactional()
    public Page<BatchAuditResponse> getAll(BatchAuditSearchRequest request) {

        Pageable pageable = PageRequest.of(
                request.page(),
                request.size(),
                Sort.by(Sort.Direction.DESC, "performedAt"));

        return batchAuditRepository
                .findAll(BatchAuditSpecification.filter(request), pageable)
                .map(batchAuditMapper::toResponse);
    }

}
