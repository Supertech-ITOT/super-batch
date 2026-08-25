package com.supertech.superbatch.manager.license.dto;

public record TrialActivationRequest(
        String machineId,
        String companyName,
        String email) {

}
