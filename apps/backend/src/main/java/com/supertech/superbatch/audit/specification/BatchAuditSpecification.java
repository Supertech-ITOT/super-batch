package com.supertech.superbatch.audit.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.supertech.superbatch.audit.dto.BatchAuditSearchRequest;
import com.supertech.superbatch.audit.entity.BatchAudit;

import jakarta.persistence.criteria.Predicate;

public class BatchAuditSpecification {
    public static Specification<BatchAudit> filter(BatchAuditSearchRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (request.search() != null && !request.search().isBlank()) {
                String search = "%" + request.search().toLowerCase() + "%";
                predicates.add(
                        cb.or(
                                cb.like(cb.lower(root.get("entity")), search),
                                cb.like(cb.lower(root.get("oldData")), search),
                                cb.like(cb.lower(root.get("newData")), search),
                                cb.like(cb.lower(root.join("performedBy").get("name")), search)

                        ));
            }

            if (request.module() != null) {
                predicates.add(cb.equal(root.get("module"), request.module()));
            }

            if (request.action() != null) {
                predicates.add(
                        cb.equal(root.get("action"), request.action()));
            }

            if (request.userId() != null) {
                predicates.add(
                        cb.equal(root.get("performedBy").get("id"), request.userId()));
            }

            if (request.fromDate() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("performedAt"),
                                request.fromDate().atStartOfDay()));
            }

            if (request.toDate() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("performedAt"),
                                request.toDate().atTime(23, 59, 59)));
            }
            return cb.and(predicates.toArray(new Predicate[0]));

        };
    }

}
