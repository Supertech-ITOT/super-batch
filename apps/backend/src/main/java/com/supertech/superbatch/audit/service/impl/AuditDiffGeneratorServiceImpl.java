package com.supertech.superbatch.audit.service.impl;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.superbatch.audit.dto.AuditDiff;
import com.supertech.superbatch.audit.service.AuditDiffGeneratorService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuditDiffGeneratorServiceImpl implements AuditDiffGeneratorService {
    private final ObjectMapper objectMapper;

    @Override
    public AuditDiff generate(Object oldObject, Object newObject) {

        if (oldObject == null && newObject == null) {
            return new AuditDiff(null, null);
        }

        if (oldObject == null) {
            return new AuditDiff(
                    null,
                    toJson(newObject));
        }

        if (newObject == null) {
            return new AuditDiff(
                    toJson(oldObject),
                    null);
        }

        Map<String, Object> oldMap = objectMapper.convertValue(oldObject, Map.class);
        Map<String, Object> newMap = objectMapper.convertValue(newObject, Map.class);

        Map<String, Object> oldChanges = new LinkedHashMap<>();
        Map<String, Object> newChanges = new LinkedHashMap<>();

        for (String key : oldMap.keySet()) {

            if (!Objects.equals(oldMap.get(key), newMap.get(key))) {

                oldChanges.put(key, oldMap.get(key));
                newChanges.put(key, newMap.get(key));
            }
        }

        return new AuditDiff(
                toJson(oldChanges),
                toJson(newChanges));
    }

    @Override
    public String toJson(Object object) {
        if (object == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
