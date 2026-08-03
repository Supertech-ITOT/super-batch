package com.supertech.superbatch.manager.setup.service;

import com.supertech.superbatch.manager.setup.dto.SetupRequest;
import com.supertech.superbatch.manager.setup.dto.SetupResponse;

public interface SetupService {
    SetupResponse getSetupStatus();

    void setup(SetupRequest request);
}