package com.supertech.superbatch.report.specification;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.report.dto.ReportFilterRequest;
import jakarta.persistence.criteria.Predicate;

public class ReportSpecification {

    public static Specification<Batch> filter(ReportFilterRequest request) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (request.search() != null && !request.search().isBlank()) {
                String search = "%" + request.search().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("batchNo")), search),
                        cb.like(cb.lower(root.get("status")), search),
                        cb.like(cb.lower(root.get("masterRecipe").get("material").get("name")), search),
                        cb.like(cb.lower(root.get("masterRecipe").get("material").get("code")), search),
                        cb.like(cb.lower(root.get("masterRecipe").get("name")), search),
                        cb.like(cb.lower(root.get("unit").get("code")), search),
                        cb.like(cb.lower(root.get("unit").get("name")), search)));
            }
            if (request.batchStatus() != null) {
                predicates.add(cb.equal(root.get("status"), request.batchStatus()));
            }
            if (request.productId() != null) {
                predicates.add(cb.equal(root.get("masterRecipe").get("material").get("id"), request.productId()));
            }
            if (request.unitId() != null) {
                predicates.add(cb.equal(root.get("unit").get("id"), request.unitId()));
            }
            if (request.masterRecipeId() != null) {
                predicates.add(cb.equal(root.get("masterRecipe").get("id"), request.masterRecipeId()));
            }
            if (request.fromDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startDateTime"), request.fromDate()));
            }
            if (request.toDate() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("endDateTime"), request.toDate()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}