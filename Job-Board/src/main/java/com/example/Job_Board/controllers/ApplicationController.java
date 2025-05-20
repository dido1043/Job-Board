package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.appDto.ApplicationDto;
import com.example.Job_Board.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/application")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }
    @GetMapping("/all")
    public  ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(applicationService.getAllApplications());
    }
    @GetMapping("/seeker/{id}")
    public ResponseEntity<?> getApplicationByJobSeekerId(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(applicationService.getApplicationsByApplicantId(id));
    }
    @GetMapping("/job/{id}")
    public ResponseEntity<?> getApplicationByJobPostId(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(applicationService.getApplicationsByJobPostId(id));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(applicationService.getApplicationById(id));
    }
    @PostMapping("/add")
    public ResponseEntity<?> addApplication(@RequestBody ApplicationDto applicationDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.createApplication(applicationDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable Long id){
        return  ResponseEntity.status(HttpStatus.OK).body(applicationService.deleteApplication(id));
    }
}
