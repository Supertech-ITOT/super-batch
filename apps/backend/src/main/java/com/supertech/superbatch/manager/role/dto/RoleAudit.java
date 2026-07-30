package com.supertech.superbatch.manager.role.dto;

import lombok.Builder;

@Builder
public record RoleAudit(
        Long id,
        String name,
        String description

) {

}
