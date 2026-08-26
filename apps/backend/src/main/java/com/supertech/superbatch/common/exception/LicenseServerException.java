package com.supertech.superbatch.common.exception;

import org.springframework.http.HttpStatus;

public class LicenseServerException extends ApplicationException {

    public LicenseServerException(
            String message,
            HttpStatus httpStatus) {

        super(message, httpStatus);
    }
}