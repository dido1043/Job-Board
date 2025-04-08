package com.example.Job_Board.services;

import com.example.Job_Board.models.dtos.jpDto.JobPostDto;
import com.example.Job_Board.models.entity.User;

import java.util.List;

public interface JobPostService {
    JobPostDto createJobPost(JobPostDto jobPostDto);
    JobPostDto updateJobPost(Long id, JobPostDto jobPostDto);
    String deleteJobPost(Long id);
    List<JobPostDto> getAllJobPosts();
    JobPostDto getJobPostById(Long id);
    List<JobPostDto> filterJobs(String seniority);
    List<JobPostDto> recommendedJobs(Long id);

}
