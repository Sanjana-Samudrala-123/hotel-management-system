package com.hotel.management.service;

import com.hotel.management.model.FoodItem;
import com.hotel.management.model.FoodOrder;
import com.hotel.management.model.OrderItem;
import com.hotel.management.model.OrderStatus;
import com.hotel.management.repository.FoodItemRepository;
import com.hotel.management.repository.FoodOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FoodService {
    @Autowired
    private FoodItemRepository foodItemRepository;
    
    @Autowired
    private FoodOrderRepository foodOrderRepository;

    public FoodItem addFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public FoodOrder placeOrder(FoodOrder order) {
        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            throw new RuntimeException("Order must have at least one item");
        }
        if (order.getCustomer() == null || order.getCustomer().getId() == null) {
            throw new RuntimeException("Customer information is missing");
        }
        if (order.getRoom() == null || order.getRoom().getId() == null) {
            throw new RuntimeException("Room information is missing");
        }

        double total = 0;
        for (OrderItem item : order.getOrderItems()) {
            if (item.getFoodItem() == null || item.getFoodItem().getFoodId() == null) {
                throw new RuntimeException("Food item information is missing for an item");
            }
            FoodItem food = foodItemRepository.findById(item.getFoodItem().getFoodId())
                    .orElseThrow(() -> new RuntimeException("Food item not found with ID: " + item.getFoodItem().getFoodId()));
            total += food.getPrice() * item.getQuantity();
        }
        order.setTotalAmount(total);
        order.setOrderTime(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.PREPARING);
        return foodOrderRepository.save(order);
    }

    public List<FoodOrder> getAllOrders() {
        return foodOrderRepository.findAll();
    }

    public List<FoodOrder> getOrdersByCustomerId(Long customerId) {
        return foodOrderRepository.findByCustomerId(customerId);
    }
}
