package com.MIS.dto;

import lombok.Data;

@Data

public class LoginResponse {

    private Integer userId;
    private String fullName;
    private String email;
    private String role;
    private String token;
    private String message;

    // getters and setters
}