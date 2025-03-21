package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.jpDto.JobPostDto;
import com.example.Job_Board.models.entity.JobPost;
import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.JobPostRepository;
import com.example.Job_Board.repository.UserRepository;
import com.example.Job_Board.services.JobPostService;
import com.example.Job_Board.services.impl.JobPostServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/post")
public class JobPostController {

   private final JobPostService jobPostService;


    @Autowired
    public JobPostController(JobPostService jobPostService) {
        this.jobPostService = jobPostService;

    }
    @GetMapping("/all")
    public ResponseEntity<?> allJobPosts(){
        List<JobPostDto> jobPosts = jobPostService.getAllJobPosts();
        return ResponseEntity.status(HttpStatus.OK).body(jobPosts);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(jobPostService.getJobPostById(id));
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody JobPostDto jobPostDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobPostService.createJobPost(jobPostDto));
    }

}
