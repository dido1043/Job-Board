package com.example.Job_Board.services.impl;

import com.example.Job_Board.models.dtos.resumeDto.ResumeDto;
import com.example.Job_Board.models.entity.Resume;
import com.example.Job_Board.repository.ResumeRepository;
import com.example.Job_Board.repository.UserRepository;
import com.example.Job_Board.services.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ResumeServiceImpl implements ResumeService {
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    @Autowired
    public ResumeServiceImpl(ResumeRepository resumeRepository, UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResumeDto craeteResume(ResumeDto resumeDto) {
        Resume resume = convertToEntity(resumeDto);
        Resume savedResume = resumeRepository.save(resume);
        return convertToDto(savedResume);
    }

    @Override
    public ResumeDto getResumeById(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inavlid resume"));
        return convertToDto(resume);
    }

    @Override
    public List<ResumeDto> getAllResumes() {
        return List.of();
    }

    @Override
    public ResumeDto updateResume(Long id, ResumeDto resumeDto) {
        return null;
    }

    @Override
    public String deleteResume() {
        return "";
    }

    private ResumeDto convertToDto(Resume resume){

        ResumeDto resumeDto = new ResumeDto();
        resumeDto.setId(resume.getId());
        resumeDto.setJobSeekerId(resume.getJobSeeker().getId());
        resumeDto.setFilePath(resume.getFilePath());
        return resumeDto;
    }
    private Resume convertToEntity(ResumeDto resumeDto){
        Resume resume = new Resume();
        resume.setJobSeeker(userRepository.findById(resumeDto.getJobSeekerId())
                .orElseThrow(() -> new RuntimeException("Invalid user")));
        resume.setFilePath(resumeDto.getFilePath());
        return resume;
    }
}
