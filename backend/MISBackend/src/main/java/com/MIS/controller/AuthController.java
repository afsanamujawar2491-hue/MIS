package com.MIS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MIS.dto.AddUserRequest;
import com.MIS.dto.ForgotPasswordRequest;
import com.MIS.dto.LoginRequest;
import com.MIS.dto.RegisterRequest;
import com.MIS.dto.ResetPasswordRequest;
import com.MIS.service.AuthService;

import jakarta.validation.Valid;

@RestController

@RequestMapping("/api/auth")

public class AuthController {

    @Autowired

    AuthService service;

    //Register API
    @PostMapping("/register")


public ResponseEntity<?> register(@Valid
        @RequestBody RegisterRequest request){

    String result = service.register(request);

    if(result.equals("Email already exists")) {
        return ResponseEntity.badRequest().body(result);
    }

    return ResponseEntity.ok(result);
}
   //Login API 
    @PostMapping("/login")

public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    return service.login(request);
}
    
    //Forgot Password API
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgotPasswordRequest request){

        return ResponseEntity.ok(
                service.forgotPassword(request));
    }
    
    //Reset Password API

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request){

        return ResponseEntity.ok(
                service.resetPassword(request));
    }
    
    //Verify API
    @GetMapping("/verify")
    

public ResponseEntity<String> verify(@RequestParam String token) {

    try {
        String result = service.verify(token);

        if (result.equals("verified")) {
            return ResponseEntity.ok("verified");
        }

        if (result.equals("already_verified")) {
            return ResponseEntity.ok("already_verified");
        }

        return ResponseEntity.status(400).body("invalid");

    } catch (Exception e) {
        return ResponseEntity.status(500).body("error");
    }
}
    
    //Add User API
    @PostMapping("/add-user")
    public ResponseEntity<?> addUser(
            @RequestBody AddUserRequest request){

        return ResponseEntity.ok(
                service.addUser(request));
    }
//Validate reset link
    @GetMapping("/validate-reset-token")
    public ResponseEntity<String> validateToken(@RequestParam String token) {

        boolean valid = service.validateResetToken(token);
        System.out.println("TOKEN HIT: " + token);
        if (valid) {
            return ResponseEntity.ok("valid");
        } else {
            return ResponseEntity.status(400).body("invalid");
        }
    }
}
