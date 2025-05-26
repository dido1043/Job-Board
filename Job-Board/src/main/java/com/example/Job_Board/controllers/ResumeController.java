package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.resumeDto.ResumeDto;
import com.example.Job_Board.services.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resume")
//@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {
    private final ResumeService resumeService;

    @Autowired
    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(resumeService.getResumeById(id));
    }

    @GetMapping("/get-by-userId/{id}")
    public ResponseEntity<?> getByJobSeekerId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(resumeService.getByJobSeekerId(id));
    }

    @GetMapping("/all")
    public ResponseEntity<?> allResumes() {
        return ResponseEntity.status(HttpStatus.OK).body(resumeService.getAllResumes());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addResume(@RequestBody ResumeDto resumeDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resumeService.craeteResume(resumeDto));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editResume(@PathVariable Long id, @RequestBody ResumeDto resumeDto) {
        return ResponseEntity.status(HttpStatus.OK).body(resumeService.updateResume(id, resumeDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteResume(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(resumeService.deleteResume(id));
    }
}
