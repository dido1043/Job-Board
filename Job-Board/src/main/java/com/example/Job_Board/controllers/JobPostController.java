package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.jpDto.JobPostDto;
import com.example.Job_Board.services.JobPostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    @GetMapping("/filter/{seniority}")
    public ResponseEntity<?> filterBySeniority(@PathVariable String seniority){
        return ResponseEntity.status(HttpStatus.OK).body(jobPostService.filterJobs(seniority));
    }
    @GetMapping("/recommended/{id}")
    public ResponseEntity<?> recommendedJobs(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(jobPostService.recommendedJobs(id));
    }


    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody JobPostDto jobPostDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobPostService.createJobPost(jobPostDto));
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @RequestBody JobPostDto jobPostDto){
        return ResponseEntity.status(HttpStatus.OK).body(jobPostService.updateJobPost(id, jobPostDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(jobPostService.deleteJobPost(id));
    }
}
