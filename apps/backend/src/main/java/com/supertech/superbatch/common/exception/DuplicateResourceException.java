package com.supertech.superbatch.common.exception;

import org.springframework.http.HttpStatus;

public class DuplicateResourceException
        extends ApplicationException {

    public DuplicateResourceException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}