package com.example.Job_Board.models.dtos.resumeDto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ResumeDto {
    @NotNull(message = "Id is required")
    private Long id;
    @NotNull(message = "JobSeeker Id is required")
    private Long jobSeekerId;
    @NotNull(message = "File path is required")
    private String filePath;

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

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
