package com.example.Job_Board.repository;

import com.example.Job_Board.models.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobSeekerId(Long id);
    List<Application> findByJobPostId(Long id);
    void deleteByJobPostId(Long jobPostId);
}
