package com.hotel.management.controller;

import com.hotel.management.model.FoodItem;
import com.hotel.management.model.FoodOrder;
import com.hotel.management.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/foods")
@CrossOrigin(origins = "*")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @PostMapping("/add")
    public FoodItem addFoodItem(@RequestBody FoodItem foodItem) {
        return foodService.addFoodItem(foodItem);
    }

    @GetMapping("/all")
    public List<FoodItem> getAllFoodItems() {
        return foodService.getAllFoodItems();
    }
}

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
class OrderController {
    @Autowired
    private FoodService foodService;

    @PostMapping("/add")
    public FoodOrder placeOrder(@RequestBody FoodOrder order) {
        return foodService.placeOrder(order);
    }

    @GetMapping("/all")
    public List<FoodOrder> getAllOrders() {
        return foodService.getAllOrders();
    }

    @GetMapping("/customer/{id}")
    public List<FoodOrder> getOrdersByCustomerId(@PathVariable Long id) {
        return foodService.getOrdersByCustomerId(id);
    }
}
