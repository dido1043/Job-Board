package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.resumeDto.ResumeDto;
import com.example.Job_Board.services.ResumeService;
import com.example.Job_Board.services.impl.ResumeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resume")
public class ResumeController {
    private final ResumeService resumeService;

    @Autowired
    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addResume(@RequestBody ResumeDto resumeDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(resumeService.craeteResume(resumeDto));
    }
}
