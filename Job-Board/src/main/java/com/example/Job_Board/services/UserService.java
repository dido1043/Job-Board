package com.example.Job_Board.services;

import java.util.List;

public interface UserService {
    List<String> addSkills(List<String> skills);
    String setSeniority(String seniority);
}
