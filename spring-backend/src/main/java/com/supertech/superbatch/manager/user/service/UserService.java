package com.supertech.superbatch.manager.user.service;

import java.util.List;

import com.supertech.superbatch.manager.user.dto.UpdateUserRequest;
import com.supertech.superbatch.manager.user.dto.UserRequest;
import com.supertech.superbatch.manager.user.dto.UserResponse;

public interface UserService {

    List<UserResponse> getAll();

    UserResponse getById(Long id);

    void create(UserRequest request);

    void update(Long id, UpdateUserRequest request);

    void delete(Long id);

}