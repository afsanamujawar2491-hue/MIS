package com.MIS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MIS.entity.User;
import com.MIS.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository repo;

    @GetMapping
    public List<User> getAllUsers(){
        return repo.findAll();
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id){

        repo.deleteById(id);

        return "User Deleted Successfully";
    }

    @PutMapping("/status/{id}")
    public String updateStatus(
            @PathVariable Long id){

        User user = repo.findById(id)
                .orElseThrow();

        if(user.getStatus().equals("active")){
            user.setStatus("inactive");
        }else{
            user.setStatus("active");
        }

        repo.save(user);

        return "Status Updated";
    }
}