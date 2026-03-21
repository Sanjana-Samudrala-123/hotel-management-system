package com.hotel.management.controller;

import com.hotel.management.model.FoodItem;
import com.hotel.management.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/food")
@CrossOrigin(origins = "*")
public class FoodItemController {
    @Autowired
    private FoodItemService foodItemService;

    @GetMapping("/all")
    public List<FoodItem> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }

    @PostMapping("/add")
    public FoodItem addFoodItem(@RequestBody FoodItem item) {
        return foodItemService.addFoodItem(item);
    }
}
