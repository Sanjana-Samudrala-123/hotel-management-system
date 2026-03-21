package com.hotel.management.service;

import com.hotel.management.model.User;
import com.hotel.management.model.Customer;
import com.hotel.management.repository.UserRepository;
import com.hotel.management.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CustomerRepository customerRepository;

    public User register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        
        // Create a matching customer profile
        Customer customer = new Customer();
        customer.setName(user.getUsername());
        customer.setEmail(user.getUsername() + "@hotel.com");
        customer = customerRepository.save(customer);
        
        user.setCustomer(customer);
        user.setRole("CUSTOMER"); 
        return userRepository.save(user);
    }

    public User login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return userOpt.get();
        }
        throw new RuntimeException("Invalid credentials");
    }
}
