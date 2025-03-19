package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.jpDto.JobPostDto;
import com.example.Job_Board.models.entity.JobPost;
import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.JobPostRepository;
import com.example.Job_Board.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/post")
public class JobPostController {

    private final JobPostRepository jobPostRepository;
    private final UserRepository userRepository;
    @Autowired
    public JobPostController(JobPostRepository jobPostRepository, UserRepository userRepository) {
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody JobPostDto jobPostDto) {
        // Check if recruiter exists
        Optional<User> recruiterOpt = userRepository.findById(jobPostDto.getRecruiterId());
        if (recruiterOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Recruiter not found with ID: " + jobPostDto.getRecruiterId()));
        }

        User recruiter = recruiterOpt.get();
        // Create and save JobPost
        JobPost jobPost = new JobPost();
        jobPost.setTitle(jobPostDto.getTitle());
        jobPost.setDescription(jobPostDto.getDescription());
        jobPost.setLocation(jobPostDto.getLocation());
        jobPost.setSalary(jobPostDto.getSalary());
        jobPost.setRecruiter(recruiter);

        JobPost savedJob = jobPostRepository.save(jobPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
    }

}
