package com.example.Job_Board.repository;

import com.example.Job_Board.models.entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {
    List<JobPost> findByRecruiterId(Long recruiterId);
    Optional<JobPost> findById(Long id);
    List<JobPost> findBySeniorityIgnoreCase(String seniority);
}
