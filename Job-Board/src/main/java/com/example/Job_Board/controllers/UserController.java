package com.example.Job_Board.controllers;

import com.example.Job_Board.models.dtos.userDtos.SeniorityRequestDTO;
import com.example.Job_Board.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/set-seniority/{id}")
    public ResponseEntity<?> setSeniority(@PathVariable Long id, @RequestBody SeniorityRequestDTO seniorityRequestDTO){
        return ResponseEntity.status(HttpStatus.OK).body(userService.setSeniority(id, seniorityRequestDTO.getSeniority()));
    }
    @PostMapping("/make-admin/{id}")
    public ResponseEntity<?> makeAdmin(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.makeAdmin(id));
    }
    @GetMapping("/get-role/{id}")
    public ResponseEntity<?> getUserRole(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserRole(id));  
    }
    @PostMapping("/become-recruiter/{id}")
    public ResponseEntity<?> becomeRecruiter(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.becomeRecruiter(id));
    }
    @GetMapping("/find/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email){
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUserByEmail(email));
    }
    @GetMapping("/get-username/{id}")
    public ResponseEntity<?> getUsername(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsername(id));
    }
    @GetMapping("/get-seniority/{id}")
    public ResponseEntity<?> getSeniority(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserSeniority(id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
    }
}
