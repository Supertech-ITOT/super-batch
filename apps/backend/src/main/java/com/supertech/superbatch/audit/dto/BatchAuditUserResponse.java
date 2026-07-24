package com.supertech.superbatch.audit.dto;

import lombok.Builder;

@Builder
public record BatchAuditUserResponse(
                Long id,
                String name,
                String email,
                String role

) {

}
