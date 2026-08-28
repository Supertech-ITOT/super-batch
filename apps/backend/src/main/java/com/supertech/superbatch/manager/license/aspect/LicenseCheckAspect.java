package com.supertech.superbatch.manager.license.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.manager.license.service.LicenseService;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class LicenseCheckAspect {

    private final LicenseService licenseService;

    @Before("@annotation(com.supertech.superbatch.manager.license.annotation.RequiresLicense) " +
            "|| @within(com.supertech.superbatch.manager.license.annotation.RequiresLicense)")
    public void checkLicense(JoinPoint joinPoint) {
        // String className = joinPoint.getTarget().getClass().getSimpleName();
        // String methodName = joinPoint.getSignature().getName();
        boolean valid = licenseService.isLicenseValid();
        if (!valid) {
            throw new BadRequestException("A valid license is required.");
        }
    }
}