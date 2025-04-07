package com.example.Job_Board.controllers;

import com.example.Job_Board.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/show-skills/{id}")
    public ResponseEntity<?> showSkills(@PathVariable Long id){
        return  ResponseEntity.status(HttpStatus.OK).body(userService.showSkillsOfUser(id));
    }
    @PostMapping("/add-skills/{id}")
    public ResponseEntity<?> addSkills(@PathVariable Long id, @RequestBody List<String> skills){
        return ResponseEntity.status(HttpStatus.OK).body(userService.addSkills(id,skills));
    }
}
