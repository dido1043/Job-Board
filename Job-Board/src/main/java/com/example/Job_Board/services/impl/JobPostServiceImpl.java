package com.example.Job_Board.services.impl;

import com.example.Job_Board.models.dtos.jpDto.JobPostDto;
import com.example.Job_Board.models.entity.JobPost;
import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.JobPostRepository;
import com.example.Job_Board.repository.UserRepository;
import com.example.Job_Board.services.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class JobPostServiceImpl implements JobPostService {
    private final JobPostRepository jobPostRepository;
    private final UserRepository userRepository;

    @Autowired
    public JobPostServiceImpl(JobPostRepository jobPostRepository, UserRepository userRepository) {
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
    }


    @Override
    public JobPostDto createJobPost(JobPostDto jobPostDto) {
       JobPost jobPost = convertToEntity(jobPostDto);
       if (jobPost == null){
           throw new RuntimeException("Invalid job post.");
       }
       JobPost savedJp = jobPostRepository.save(jobPost);
       return convertToDTO(savedJp);
    }

    @Override
    public JobPostDto updateJobPost(Long id, JobPostDto jobPostDto) {
        return null;
    }

    @Override
    public void deleteJobPost(Long id) {

    }

    @Override
    public List<JobPostDto> getAllJobPosts() {
        List<JobPost> jobPosts = jobPostRepository.findAll();

        return jobPosts.stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public JobPostDto getJobPostById(Long id) {
        return null;
    }
    private JobPostDto convertToDTO(JobPost jobPost) {
        JobPostDto jobPostDto = new JobPostDto();
        jobPostDto.setId(jobPost.getId());
        jobPostDto.setTitle(jobPost.getTitle());
        jobPostDto.setDescription(jobPost.getDescription());
        jobPostDto.setLocation(jobPost.getLocation());
        jobPostDto.setSalary(jobPost.getSalary());
        jobPostDto.setRecruiterId(jobPost.getRecruiter().getId());

        return jobPostDto;
    }

    private JobPost convertToEntity(JobPostDto jobPostDto) {
        JobPost jobPost = new JobPost();
        jobPost.setTitle(jobPostDto.getTitle());
        jobPost.setDescription(jobPostDto.getDescription());
        jobPost.setLocation(jobPostDto.getLocation());
        jobPost.setSalary(jobPostDto.getSalary());
        User recruiter = userRepository.findById(jobPostDto.getRecruiterId())
                .orElseThrow(() -> new RuntimeException("Recruiter with ID " + jobPostDto.getRecruiterId() + " not found"));
        jobPost.setRecruiter(recruiter);
        return jobPost;
    }
}
