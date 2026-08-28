package com.supertech.superbatch.manager.license.crypto;

public interface LicenseSignatureService {
    boolean verify(String data, String signature);

}
