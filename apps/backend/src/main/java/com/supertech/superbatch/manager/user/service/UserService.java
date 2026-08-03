package com.supertech.superbatch.manager.user.service;

import java.util.List;

import com.supertech.superbatch.manager.user.dto.ChangePasswordRequest;
import com.supertech.superbatch.manager.user.dto.ResetFirstPasswordRequest;
import com.supertech.superbatch.manager.user.dto.ResetPasswordRequest;
import com.supertech.superbatch.manager.user.dto.UpdateUserRequest;
import com.supertech.superbatch.manager.user.dto.UserRequest;
import com.supertech.superbatch.manager.user.dto.UserResponse;

public interface UserService {

    List<UserResponse> getAll();

    UserResponse getById(Long id);

    UserResponse getCurrentUser(Long currentUserId);

    void create(UserRequest request, Long userId);

    void update(Long id, UpdateUserRequest request);

    void delete(Long id, Long currentUserId);

    void resetFirstPassword(ResetFirstPasswordRequest request, Long currentUserId);

    void changePassword(ChangePasswordRequest request, Long currentUserId);

    void resetPassword(ResetPasswordRequest request, Long currentUserId);

}