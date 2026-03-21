package com.hotel.management.service;

import com.hotel.management.model.FoodItem;
import com.hotel.management.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoodItemService {
    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public FoodItem addFoodItem(FoodItem item) {
        return foodItemRepository.save(item);
    }
}
