package com.supertech.superbatch.audit.service;

import com.supertech.superbatch.audit.dto.AuditDiff;

public interface AuditDiffGeneratorService {

    AuditDiff generate(Object oldObject, Object newObject);

    String toJson(Object object);
}
