package com.hotel.management.repository;

import com.hotel.management.model.FoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {
    List<FoodOrder> findByCustomerId(Long customerId);
}
