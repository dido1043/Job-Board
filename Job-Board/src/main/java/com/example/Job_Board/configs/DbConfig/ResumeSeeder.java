package com.example.Job_Board.configs.DbConfig;

import com.example.Job_Board.models.entity.Resume;
import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.ResumeRepository;
import com.example.Job_Board.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Component
public class ResumeSeeder implements CommandLineRunner {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeSeeder(ResumeRepository resumeRepository, UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }
    @Override
    public void run(String... args) throws Exception {
        // Check if resumes already exist
        if (resumeRepository.count() > 0) {
            System.out.println("Resumes already seeded. Skipping...");
            return;
        }

        // Fetch a job seeker (assuming there's at least one user in the DB)
        List<User> jobSeekers = userRepository.findAll();
        if (jobSeekers.isEmpty()) {
            System.out.println("No job seekers found! Add users first.");
            return;
        }

        User jobSeeker = jobSeekers.get(0); // Get first job seeker

        // Create and save a resume
        Resume resume = new Resume();
        resume.setJobSeeker(jobSeeker);
        resume.setFilePath("/uploads/resumes/sample_resume.pdf");
        resume.setCreatedAt(Timestamp.from(Instant.now()).toLocalDateTime());

        resumeRepository.save(resume);
        System.out.println("Seeded resume for job seeker: " + jobSeeker.getId());
    }
}
