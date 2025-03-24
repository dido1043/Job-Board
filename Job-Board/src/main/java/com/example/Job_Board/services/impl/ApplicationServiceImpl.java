package com.example.Job_Board.services.impl;

import com.example.Job_Board.models.dtos.appDto.ApplicationDto;
import com.example.Job_Board.models.entity.Application;
import com.example.Job_Board.models.entity.JobPost;
import com.example.Job_Board.models.entity.Resume;
import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.ApplicationRepository;
import com.example.Job_Board.repository.JobPostRepository;
import com.example.Job_Board.repository.ResumeRepository;
import com.example.Job_Board.repository.UserRepository;
import com.example.Job_Board.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobPostRepository jobPostRepository;
    private final ResumeRepository resumeRepository;
    @Autowired
    public ApplicationServiceImpl(ApplicationRepository applicationRepository,
                                  UserRepository userRepository,
                                  JobPostRepository jobPostRepository, ResumeRepository resumeRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobPostRepository = jobPostRepository;
        this.resumeRepository = resumeRepository;
    }

    @Override
    public ApplicationDto createApplication(ApplicationDto applicationDto) {
        Application application = convertToEntity(applicationDto);
        Application savedApplication = applicationRepository.save(application);
        return convertToDTO(savedApplication);
    }

    @Override
    public ApplicationDto getApplicationById(Long id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invalid job application"));
        return convertToDTO(application);
    }

    @Override
    public List<ApplicationDto> getApplicationsByJobPostId(Long jobPostId) {
        List<Application> applications = applicationRepository.findByJobPostId(jobPostId);
        return applications.stream().map(this::convertToDTO).toList();
    }

    @Override
    public List<ApplicationDto> getApplicationsByApplicantId(Long applicantId) {
        List<Application> applicationList = applicationRepository.findByJobSeekerId(applicantId);
        return applicationList.stream().map(this::convertToDTO).toList();
    }

    @Override
    public ApplicationDto updateApplication(Long id, ApplicationDto applicationDto) {
        return null;
    }

    @Override
    public void deleteApplication(Long id) {

    }

    private ApplicationDto convertToDTO(Application application){
        ApplicationDto applicationDto = new ApplicationDto();
        applicationDto.setId(application.getId());
        applicationDto.setJobPostId(application.getJobPost().getId());
        applicationDto.setJobSeekerId(application.getJobSeeker().getId());
        applicationDto.setResumeId(application.getResume().getId());
        return applicationDto;
    }

    private Application convertToEntity(ApplicationDto applicationDto){
        JobPost jobPost = jobPostRepository.findById(applicationDto.getJobPostId())
                .orElseThrow(() -> new RuntimeException("Invalid job post"));
        User jobSeeker = userRepository.findById(applicationDto.getJobSeekerId())
                .orElseThrow(() -> new RuntimeException("Invalid job seeker"));
        Resume resume = resumeRepository.findById(applicationDto.getResumeId())
                .orElseThrow(() -> new RuntimeException("Invalid resume"));

        Application application = new Application();
        application.setJobPost(jobPost);
        application.setJobSeeker(jobSeeker);
        application.setResume(resume);
        return application;
    }
}
