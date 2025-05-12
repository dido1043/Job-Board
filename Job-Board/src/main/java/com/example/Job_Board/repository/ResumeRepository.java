package com.example.Job_Board.repository;

import com.example.Job_Board.models.entity.Application;
import com.example.Job_Board.models.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByJobSeekerId(Long id);
}
