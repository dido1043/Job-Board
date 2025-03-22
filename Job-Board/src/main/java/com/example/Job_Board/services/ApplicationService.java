package com.example.Job_Board.services;

import com.example.Job_Board.models.dtos.appDto.ApplicationDto;

import java.util.List;

public interface ApplicationService {
    ApplicationDto createApplication(ApplicationDto applicationDto);
    ApplicationDto getApplicationById(Long id);
    List<ApplicationDto> getApplicationsByJobPostId(Long jobPostId);
    List<ApplicationDto> getApplicationsByApplicantId(Long applicantId);
    ApplicationDto updateApplication(Long id, ApplicationDto applicationDto);
    void deleteApplication(Long id);
}
