package com.example.Job_Board.configs.DbConfig;

import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UsersSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            System.out.println("Users already seeded. Skipping...");
            return;
        }
        User adminUser = new User();
        adminUser.setUsername("DeyanAdmin");
        adminUser.setEmail("deyan.admin05@gmail.com");
        adminUser.setPasswordHash(passwordEncoder.encode("didodido1"));
        adminUser.setRole("ADMIN");
        adminUser.setLocation("Plovdiv");
        adminUser.setSeniority("Senior");


        userRepository.save(adminUser);
        System.out.println("Seeded initial users.");
    }
}
