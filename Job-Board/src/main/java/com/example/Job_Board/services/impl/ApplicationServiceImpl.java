package com.example.Job_Board.services.impl;

import com.example.Job_Board.models.dtos.appDto.ApplicationDto;
import com.example.Job_Board.services.ApplicationService;

import java.util.List;

public class ApplicationServiceImpl implements ApplicationService {
    @Override
    public ApplicationDto createApplication(ApplicationDto applicationDto) {
        return null;
    }

    @Override
    public ApplicationDto getApplicationById(Long id) {
        return null;
    }

    @Override
    public List<ApplicationDto> getApplicationsByJobPostId(Long jobPostId) {
        return List.of();
    }

    @Override
    public List<ApplicationDto> getApplicationsByApplicantId(Long applicantId) {
        return List.of();
    }

    @Override
    public ApplicationDto updateApplication(Long id, ApplicationDto applicationDto) {
        return null;
    }

    @Override
    public void deleteApplication(Long id) {

    }
}
