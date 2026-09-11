package com.supertech.superbatch.sample_check.check_Parameter.service;

import java.util.List;

import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterRequest;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterResponse;

public interface CheckParameterService {

    void create(CheckParameterRequest request);

    void update(Long id, CheckParameterRequest request);

    void delete(Long id, Long currentUserId);

    List<CheckParameterResponse> getAll();

    CheckParameterResponse getById(Long id);

}
