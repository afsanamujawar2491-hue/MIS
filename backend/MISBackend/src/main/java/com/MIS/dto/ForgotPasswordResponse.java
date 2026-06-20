package com.MIS.dto;

import lombok.Data;

@Data
public class ForgotPasswordResponse {
    private boolean success;
    private String message;

    // getters/setters
}
