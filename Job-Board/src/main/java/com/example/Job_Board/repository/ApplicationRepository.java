package com.example.Job_Board.repository;

import com.example.Job_Board.models.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobPostId(Long jobPostId);
    List<Application> findByApplicantId(Long applicantId);
    Optional<Application> findById(Long id);
}
