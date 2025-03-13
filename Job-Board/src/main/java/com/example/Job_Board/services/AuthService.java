package com.example.Job_Board.services;

import com.example.Job_Board.dtos.requestDtos.LoginUserDto;
import com.example.Job_Board.dtos.requestDtos.RegisterUserDto;
import com.example.Job_Board.models.User;
import com.example.Job_Board.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.*;

@Service
public class AuthService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository repo, PasswordEncoder encoder, AuthenticationManager authenticationManager) {
        this.repo = repo;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
    }

    public User register(RegisterUserDto registerUserDto) {
        User user = new User();
        user.setUsername(registerUserDto.getUsername());
        user.setEmail(registerUserDto.getEmail());
        user.setPasswordHash(encoder.encode(registerUserDto.getPassword()));

        return repo.save(user);
    }

    public User authenticate(LoginUserDto loginUserDto) {
        String password = loginUserDto.getPassword();
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getEmail(),
                        loginUserDto.getPassword()
                )
        );

        return repo.findByEmail(loginUserDto.getEmail())
                .orElseThrow();


    }

}
