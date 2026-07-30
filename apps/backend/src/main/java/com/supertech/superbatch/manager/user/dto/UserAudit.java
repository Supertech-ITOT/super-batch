package com.supertech.superbatch.manager.user.dto;

import lombok.Builder;

@Builder
public record UserAudit(
        Long id,
        String name,
        String email,
        String role,
        String createdBy

) {

}
