package com.example.Job_Board.services;

import com.example.Job_Board.models.dtos.resumeDto.ResumeDto;

import java.util.List;

public interface ResumeService {
    ResumeDto craeteResume(ResumeDto resumeDto);
    ResumeDto getResumeById(Long id);
    List<ResumeDto> getAllResumes();
    List<ResumeDto> getByJobSeekerId(Long id);
    ResumeDto updateResume(Long id, ResumeDto resumeDto);
    String deleteResume(Long id);
}

