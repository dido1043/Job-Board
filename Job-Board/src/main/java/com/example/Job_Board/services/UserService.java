package com.example.Job_Board.services;

import java.util.List;

public interface UserService {
    List<String> addSkills(Long userId, List<String> skills);
    String setSeniority(Long userId, String seniority);
}
