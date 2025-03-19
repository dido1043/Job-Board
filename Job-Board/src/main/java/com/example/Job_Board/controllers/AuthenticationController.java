package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.requestDtos.LoginUserDto;
import com.example.Job_Board.models.dtos.requestDtos.RegisterUserDto;
import com.example.Job_Board.models.dtos.responseDtos.LoginResponse;
import com.example.Job_Board.models.entity.User;
import com.example.Job_Board.services.authImpl.AuthService;
import com.example.Job_Board.services.authImpl.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthService authService;
    @Autowired
    public AuthenticationController(JwtService jwtService, AuthService authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }

    @PostMapping("/register")
   public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        String password = registerUserDto.getPassword();
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        User registeredUser = authService.register(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUserDto loginUserDto){
        User user = authService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(user);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return  ResponseEntity.ok(loginResponse);
    }
}
