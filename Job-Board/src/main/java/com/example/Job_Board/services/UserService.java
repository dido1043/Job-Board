package com.example.Job_Board.services;

import com.example.Job_Board.models.entity.User;

import java.util.List;

public interface UserService {
    List<String> showSkillsOfUser(Long userId);
    List<String> addSkills(Long userId, List<String> skills);
    String setSeniority(Long userId, String seniority);
    String makeAdmin(Long id);
    String getUserRole(Long id);
    String becomeRecruiter(Long id);
    Long findUserByEmail(String email);
    String getUsername(Long id);
    String getUserSeniority(Long id);
    String deleteUser(Long id);
}
