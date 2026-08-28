package com.supertech.superbatch.manager.permission.aspect;

import java.lang.reflect.Method;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.security.UserContextService;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.manager.permission.service.PermissionService;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class PermissionCheckAspect {

    private final PermissionService permissionService;
    private final UserContextService userContextService;

    @Before("@within(com.supertech.superbatch.manager.permission.annotation.RequiresPermission) " +
            "|| @annotation(com.supertech.superbatch.manager.permission.annotation.RequiresPermission)")
    public void checkPermission(JoinPoint joinPoint) {

        Long userId = userContextService.getCurrentUserId();
        RequiresPermission requiresPermission = findPermissionAnnotation(joinPoint);

        if (requiresPermission == null) {
            throw new BadRequestException("Permission configuration not found.");
        }

        ModuleType module = requiresPermission.value();
        boolean hasAccess = permissionService.hasAccess(userId, module);

        if (!hasAccess) {
            throw new BadRequestException(
                    "You do not have permission to access this module.");
        }
    }

    private RequiresPermission findPermissionAnnotation(JoinPoint joinPoint) {

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();

        Method method = methodSignature.getMethod();

        // Method-level annotation has priority
        RequiresPermission methodAnnotation = AnnotationUtils.findAnnotation(method, RequiresPermission.class);

        if (methodAnnotation != null) {
            return methodAnnotation;
        }

        // Class-level annotation
        Class<?> targetClass = joinPoint.getTarget().getClass();

        return AnnotationUtils.findAnnotation(
                targetClass,
                RequiresPermission.class);
    }
}