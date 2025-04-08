package com.example.Job_Board.services.impl;

import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.UserRepository;
import com.example.Job_Board.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private static final Set<String> VALID_SENIORITIES = Set.of(
            "Intern", "Junior", "Mid", "Senior"
    );

    @Override
    public List<String> showSkillsOfUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getSkills().stream().toList();
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

        if (!IsValidSeniority(seniority)){
            throw new RuntimeException("Invalid seniority");
        }
        user.setSeniority(seniority);
        userRepository.save(user);
        return user.getSeniority();
    }

    private boolean IsValidSeniority(String seniority){
        return VALID_SENIORITIES.contains(seniority);
    }
}
