package com.example.Job_Board.services.impl;

import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.UserRepository;
import com.example.Job_Board.services.UserService;

import java.util.List;

public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<String> addSkills(Long userId, List<String> skills) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.getSkills().addAll(skills);
        userRepository.save(user);

        return user.getSkills();
    }

    @Override
    public String setSeniority(Long userId, String seniority) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setSeniority(seniority);
        return "Ready";
    }
}
