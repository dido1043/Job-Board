package com.example.Job_Board.models.dtos.appDto;


public class ApplicationDto {
    private Long id;
    private Long jobSeekerId;
    private Long jobPostId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getJobSeekerId() {
        return jobSeekerId;
    }

    public void setJobSeekerId(Long jobSeekerId) {
        this.jobSeekerId = jobSeekerId;
    }

    public Long getJobPostId() {
        return jobPostId;
    }

    public void setJobPostId(Long jobPostId) {
        this.jobPostId = jobPostId;
    }
}