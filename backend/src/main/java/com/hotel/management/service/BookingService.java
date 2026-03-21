package com.hotel.management.service;

import com.hotel.management.model.Booking;
import com.hotel.management.model.Room;
import com.hotel.management.repository.BookingRepository;
import com.hotel.management.repository.RoomRepository;
import com.hotel.management.model.RoomStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private RoomRepository roomRepository;

    public Booking bookRoom(Booking booking) {
        if (booking.getRoom() == null || booking.getRoom().getId() == null) {
            throw new RuntimeException("Room information is missing");
        }
        if (booking.getCustomer() == null || booking.getCustomer().getId() == null) {
            throw new RuntimeException("Customer information is missing");
        }

        Room room = roomRepository.findById(booking.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found with ID: " + booking.getRoom().getId()));
        
        if (room.getStatus() == RoomStatus.BOOKED) {
            throw new RuntimeException("Room " + room.getRoomNumber() + " is already booked");
        }
        
        room.setStatus(RoomStatus.BOOKED);
        roomRepository.save(room);
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByCustomerId(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }
}
