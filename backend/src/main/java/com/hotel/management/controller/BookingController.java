package com.hotel.management.controller;

import com.hotel.management.model.Booking;
import com.hotel.management.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/add")
    public Booking bookRoom(@RequestBody Booking booking) {
        return bookingService.bookRoom(booking);
    }

    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/customer/{id}")
    public List<Booking> getBookingsByCustomerId(@PathVariable Long id) {
        return bookingService.getBookingsByCustomerId(id);
    }
}
