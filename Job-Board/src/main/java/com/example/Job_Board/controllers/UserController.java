package com.example.Job_Board.controllers;

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
    public ResponseEntity<?> setSeniority(@PathVariable Long id, @RequestBody String seniority){
        return ResponseEntity.status(HttpStatus.OK).body(userService.setSeniority(id, seniority));
    }
    @PostMapping("/make-admin/{id}")
    public ResponseEntity<?> makeAdmin(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.makeAdmin(id));
    }
    @PostMapping("/become-recruiter/{id}")
    public ResponseEntity<?> becomeRecruiter(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.becomeRecruiter(id));
    }
    @GetMapping("/find/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email){
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUserByEmail(email));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
    }
}
