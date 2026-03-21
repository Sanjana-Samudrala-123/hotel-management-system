package com.hotel.management.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Hotel Management System API is running. Please use the frontend at http://localhost:5173";
    }
}
