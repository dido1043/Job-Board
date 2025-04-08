package com.example.Job_Board.models.dtos.jpDto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class JobPostDto {
        private Long id;

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Description is required")
        private String description;

        @NotBlank(message = "Location is required")
        private String location;

        @NotNull(message = "Salary must be provided")
        private BigDecimal salary;

        @NotNull
        private String seniority;

        private List<String> skills;
        @NotNull(message = "Recruiter ID is required")
        private Long recruiterId;

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public String getDescription() {
                return description;
        }

        public void setDescription(String description) {
                this.description = description;
        }

        public String getLocation() {
                return location;
        }

        public void setLocation(String location) {
                this.location = location;
        }

        public BigDecimal getSalary() {
                return salary;
        }

        public void setSalary(BigDecimal salary) {
                this.salary = salary;
        }

        public Long getRecruiterId() {
                return recruiterId;
        }

        public void setRecruiterId(Long recruiterId) {
                this.recruiterId = recruiterId;
        }

        public String getSeniority() {
                return seniority;
        }

        public void setSeniority(String seniority) {
                this.seniority = seniority;
        }

        public List<String> getSkills() {
                return skills;
        }

        public void setSkills(List<String> skills) {
                this.skills = skills;
        }
}
