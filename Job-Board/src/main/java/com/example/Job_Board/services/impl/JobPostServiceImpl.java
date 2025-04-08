package com.example.Job_Board.services.impl;

import com.example.Job_Board.models.dtos.jpDto.JobPostDto;
import com.example.Job_Board.models.entity.JobPost;
import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.JobPostRepository;
import com.example.Job_Board.repository.UserRepository;
import com.example.Job_Board.services.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class JobPostServiceImpl implements JobPostService {
    private final JobPostRepository jobPostRepository;
    private final UserRepository userRepository;

    private static final Set<String> VALID_SENIORITIES = Set.of(
            "Intern", "Junior", "Mid", "Senior"
    );

    @Autowired
    public JobPostServiceImpl(JobPostRepository jobPostRepository, UserRepository userRepository) {
        this.jobPostRepository = jobPostRepository;
        this.userRepository = userRepository;
    }


    @Override
    public JobPostDto createJobPost(JobPostDto jobPostDto) {
        JobPost jobPost = convertToEntity(jobPostDto);
        if (jobPost == null) {
            throw new RuntimeException("Invalid job post.");
        }
        JobPost savedJp = jobPostRepository.save(jobPost);
        return convertToDTO(savedJp);
    }

    @Override
    public JobPostDto updateJobPost(Long id, JobPostDto jobPostDto) {

        JobPost jobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invalid job post"));
        jobPost.setTitle(jobPostDto.getTitle());
        jobPost.setDescription(jobPostDto.getDescription());
        jobPost.setLocation(jobPostDto.getLocation());
        jobPost.setSeniority(jobPostDto.getSeniority());
        jobPost.setSalary(jobPostDto.getSalary());
        jobPost.setSkills(jobPostDto.getSkills());
        JobPost updatedJobPost = jobPostRepository.save(jobPost);
        return convertToDTO(updatedJobPost);
    }

    @Override
    public String deleteJobPost(Long id) {
        JobPost jobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invalid job post"));
        jobPostRepository.delete(jobPost);
        return "Deleted successfully";
    }

    @Override
    public List<JobPostDto> getAllJobPosts() {
        List<JobPost> jobPosts = jobPostRepository.findAll();

        return jobPosts.stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public JobPostDto getJobPostById(Long id) {
        JobPost jobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invalid job post"));
        return convertToDTO(jobPost);
    }

    @Override
    public List<JobPostDto> filterJobs(String seniority) {
        if (seniority != null) {
            return jobPostRepository.findBySeniorityIgnoreCase(seniority)
                    .stream()
                    .map(this::convertToDTO)
                    .toList();
        }
        return List.of();
    }
    @Override
    public List<JobPostDto> recommendedJobs(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<JobPost> recommendedJobs = jobPostRepository
                .findAll()
                .stream()
                .filter(j -> isMatchJob(user, j))
                .toList();

        return recommendedJobs
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
    private JobPostDto convertToDTO(JobPost jobPost) {
        JobPostDto jobPostDto = new JobPostDto();
        jobPostDto.setId(jobPost.getId());
        jobPostDto.setTitle(jobPost.getTitle());
        jobPostDto.setDescription(jobPost.getDescription());
        jobPostDto.setLocation(jobPost.getLocation());
        jobPostDto.setSeniority(jobPost.getSeniority());
        jobPostDto.setSalary(jobPost.getSalary());
        jobPostDto.setSkills(jobPost.getSkills());
        jobPostDto.setRecruiterId(jobPost.getRecruiter().getId());

        return jobPostDto;
    }

    private JobPost convertToEntity(JobPostDto jobPostDto) {
        JobPost jobPost = new JobPost();
        jobPost.setTitle(jobPostDto.getTitle());
        jobPost.setDescription(jobPostDto.getDescription());
        jobPost.setLocation(jobPostDto.getLocation());
        jobPost.setSeniority(IsValidSeniority(jobPostDto.getSeniority()) == true?
                jobPostDto.getSeniority() : "");
        jobPost.setSalary(jobPostDto.getSalary());
        jobPost.setSkills(jobPostDto.getSkills());
        User recruiter = userRepository.findById(jobPostDto.getRecruiterId())
                .orElseThrow(() -> new RuntimeException("Recruiter with ID " + jobPostDto.getRecruiterId() + " not found"));
        jobPost.setRecruiter(recruiter);
        return jobPost;
    }

    private boolean IsValidSeniority(String seniority) {
        return VALID_SENIORITIES.contains(seniority);
    }

    private boolean isMatchJob(User user, JobPost jobPost){
        return jobPost.getSeniority().equals(user.getSeniority()) &&
                jobPost.getSkills().stream().anyMatch(s -> user.getSkills().contains(s));
    }
}
