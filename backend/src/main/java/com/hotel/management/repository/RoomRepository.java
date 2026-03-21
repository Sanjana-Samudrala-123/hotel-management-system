package com.hotel.management.repository;

import com.hotel.management.model.Room;
import com.hotel.management.model.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStatus(RoomStatus status);
}
