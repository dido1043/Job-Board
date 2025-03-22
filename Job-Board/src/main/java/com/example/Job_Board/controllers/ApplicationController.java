package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.appDto.ApplicationDto;
import com.example.Job_Board.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/application")
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/application/{id}")
    public ResponseEntity<?> getApplicationById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(applicationService.getApplicationById(id));
    }
    @PostMapping("/add")
    public ResponseEntity<?> addApplication(@RequestBody ApplicationDto applicationDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.createApplication(applicationDto));
    }
}
