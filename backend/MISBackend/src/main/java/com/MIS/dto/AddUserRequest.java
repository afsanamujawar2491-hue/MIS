package com.MIS.dto;

import lombok.Data;

@Data
public class AddUserRequest {

    private String fullName;
    private String email;
    private String password;
    private String role;

}