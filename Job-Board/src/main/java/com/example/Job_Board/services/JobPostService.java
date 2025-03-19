package com.example.Job_Board.services;

import com.example.Job_Board.models.dtos.jpDto.JobPostDto;

import java.util.List;

public interface JobPostService {
    JobPostDto createJobPost(JobPostDto jobPostDto);
    JobPostDto updateJobPost(Long id, JobPostDto jobPostDto);
    void deleteJobPost(Long id);
    List<JobPostDto> getAllJobPosts();
    JobPostDto getJobPostById(Long id);
}
