package com.MIS.entity;


import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name="full_name")
    private String fullName;

    @Column(unique=true)
    private String email;

    @Column(name="password_hash")
    private String password;

    private String role;

    private String status;
    
    private boolean emailVerified;

    @Column(name = "verification_token")
    private String verificationToken;

    private String resetToken;

    private LocalDateTime resetTokenExpiry;

    @CreationTimestamp
    private LocalDateTime createdAt;

}