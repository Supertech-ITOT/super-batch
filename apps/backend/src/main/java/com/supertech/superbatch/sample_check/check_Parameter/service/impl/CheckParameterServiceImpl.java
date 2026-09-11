package com.supertech.superbatch.sample_check.check_Parameter.service.impl;

import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterRequest;
import com.supertech.superbatch.sample_check.check_Parameter.dto.CheckParameterResponse;
import com.supertech.superbatch.sample_check.check_Parameter.service.CheckParameterService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@Transactional
public class CheckParameterServiceImpl implements CheckParameterService {

    @Override
    public void create(CheckParameterRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public void update(Long id, CheckParameterRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public List<CheckParameterResponse> getAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }

    @Override
    public CheckParameterResponse getById() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }

}
