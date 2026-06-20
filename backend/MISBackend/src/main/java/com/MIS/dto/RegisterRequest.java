package com.MIS.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;

    private String email;
    
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$",
            message = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
        )
       

    private String password;
    

    private String role;

}
