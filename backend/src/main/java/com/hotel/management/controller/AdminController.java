package com.hotel.management.controller;

import com.hotel.management.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired private RoomRepository roomRepository;
    @Autowired private CustomerRepository customerRepository;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private FoodOrderRepository foodOrderRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalRooms = roomRepository.count();
        long availableRooms = roomRepository.findAll().stream().filter(r -> "AVAILABLE".equals(r.getStatus().name())).count();
        long totalCustomers = customerRepository.count();
        long totalBookings = bookingRepository.count();
        long totalOrders = foodOrderRepository.count();
        double totalRevenue = foodOrderRepository.findAll().stream().mapToDouble(o -> o.getTotalAmount()).sum();

        stats.put("totalRooms", totalRooms);
        stats.put("availableRooms", availableRooms);
        stats.put("totalCustomers", totalCustomers);
        stats.put("totalBookings", totalBookings);
        stats.put("totalOrders", totalOrders);
        stats.put("totalRevenue", totalRevenue);

        return stats;
    }
}
