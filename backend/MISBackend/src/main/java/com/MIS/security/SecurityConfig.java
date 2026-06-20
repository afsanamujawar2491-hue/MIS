package com.MIS.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	PasswordEncoder passwordEncoder(){

	return new BCryptPasswordEncoder();

	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(
	        HttpSecurity http) throws Exception {

	    http
	        .csrf(csrf -> csrf.disable())
	        .authorizeHttpRequests(auth -> auth

	            .requestMatchers(
	                "/api/auth/register",
	                "/api/auth/login",
	                "/api/auth/forgot-password",
	                "/api/auth/reset-password",
	                "/api/auth/verify",
	                "/api/auth/validate-reset-token"
	            ).permitAll()

	            .requestMatchers("/api/auth/add-user")
	            .hasRole("ADMIN")

	            .anyRequest()
	            .authenticated()
	        )
	        .addFilterBefore(
	                jwtFilter,
	                UsernamePasswordAuthenticationFilter.class
	        );

	    return http.build();
	}

}
