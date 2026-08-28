package com.supertech.superbatch.manager.license.crypto;

import com.supertech.superbatch.manager.license.dto.LicenseFilePayload;

public interface LicenseSignatureService {
    boolean verify(LicenseFilePayload payload);

}
