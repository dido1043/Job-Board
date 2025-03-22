package com.example.Job_Board.repository;

import com.example.Job_Board.models.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}
