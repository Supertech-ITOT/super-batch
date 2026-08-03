package com.supertech.superbatch.manager.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ChangePasswordRequest(

                @NotBlank(message = "New Password is required") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$", message = "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.") String newPassword,
                @NotBlank(message = "Current Password is required") String currentPassword) {

}
