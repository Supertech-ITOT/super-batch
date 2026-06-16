package com.supertech.superbatch.manager.service;

import java.util.List;

import com.supertech.superbatch.manager.dto.User.UserRequest;
import com.supertech.superbatch.manager.dto.User.UserResponse;

public interface UserService {

    List<UserResponse> getAll();

    UserResponse getById(Long id);

    void create(UserRequest request);

    void update(Long id, UserRequest request);

    void delete(Long id);

}