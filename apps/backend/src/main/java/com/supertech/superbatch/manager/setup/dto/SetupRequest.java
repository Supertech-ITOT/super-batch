package com.supertech.superbatch.manager.setup.dto;

import org.springframework.web.multipart.MultipartFile;

import com.supertech.superbatch.manager.setup.enums.LicenseActivationType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record SetupRequest(
        @NotBlank(message = "Name is required") String name,

        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,

        @NotBlank(message = "Password is required") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$", message = "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.") String password,

        @NotBlank(message = "Company Name is required") String companyName

// @NotNull(message = "License activation type is required")
// LicenseActivationType activationType,

// String licenseKey,

// MultipartFile licenseFile,

// boolean isTrial

) {
}