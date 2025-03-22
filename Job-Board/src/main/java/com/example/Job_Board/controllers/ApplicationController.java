package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.appDto.ApplicationDto;
import com.example.Job_Board.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/application")
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addApplication(@RequestBody ApplicationDto applicationDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.createApplication(applicationDto));
    }
}
