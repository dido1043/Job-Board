package com.example.Job_Board.dtos.jpDto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class JobPostDto {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Salary must be provided")
    private BigDecimal salary;

    @NotNull(message = "Recruiter ID is required")
    private Long recruiterId;
}
