package com.hotel.management.utils;

import com.hotel.management.model.*;
import com.hotel.management.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoomRepository roomRepository;
    private final FoodItemRepository foodItemRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    public DataSeeder(RoomRepository roomRepository, FoodItemRepository foodItemRepository, UserRepository userRepository, CustomerRepository customerRepository) {
        this.roomRepository = roomRepository;
        this.foodItemRepository = foodItemRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("admin").isEmpty()) {
            seedDefaultUser();
        }
        if (roomRepository.count() == 0) {
            seedRooms();
        }
        if (foodItemRepository.count() == 0) {
            seedFoodItems();
        }
    }

    private void seedDefaultUser() {
        Customer customer = new Customer();
        customer.setName("Admin User");
        customer.setEmail("admin@hotel.com");
        customer.setPhone("1234567890");
        customer = customerRepository.save(customer);

        User user = new User();
        user.setUsername("admin");
        user.setPassword("admin123");
        user.setRole("ADMIN");
        user.setCustomer(customer);
        userRepository.save(user);
    }

    private void seedRooms() {
        RoomType[] types = RoomType.values();
        RoomStatus status = RoomStatus.AVAILABLE;
        
        for (int i = 1; i <= 20; i++) {
            Room room = new Room();
            room.setRoomNumber(String.format("%03d", 100 + i));
            RoomType type = types[i % types.length];
            room.setRoomType(type);
            room.setPrice(type == RoomType.SINGLE ? 2999.0 : type == RoomType.DELUXE ? 5999.0 : 11999.0);
            room.setStatus(status);
            roomRepository.save(room);
        }
    }

    private void seedFoodItems() {
        String[] starters = {"Spring Rolls", "Garlic Bread", "Chicken Wings", "Paneer Tikka", "Bruschetta", "Calamari", "Nachos", "Soup of Day", "Caesar Salad", "Dim Sum"};
        String[] mainCourses = {"Margherita Pizza", "Butter Chicken", "Pasta Alfredo", "Beef Steak", "Vegetable Biryani", "Salmon Grill", "Lamb Chops", "Risotto", "Fish & Chips", "Pad Thai", "Sushi Platter", "Chicken Curry", "Lasagna", "Burger & Fries", "Tacos"};
        String[] desserts = {"Chocolate Lava Cake", "Cheesecake", "Ice Cream Sundae", "Tiramisu", "Gulab Jamun", "Fruit Tart", "Brownie", "Panna Cotta", "Apple Pie", "Sorbet"};
        String[] beverages = {"Fresh Lime Soda", "Iced Tea", "Cappuccino", "Smoothie", "Mango Lassi", "Coke/Pepsi", "Mineral Water", "Hot Chocolate", "Green Tea", "Orange Juice", "Red Wine", "Beer", "Cocktail", "Mocktail", "Espresso"};

        seedCategory(starters, FoodCategory.STARTER, 150.0, 450.0);
        seedCategory(mainCourses, FoodCategory.MAIN_COURSE, 450.0, 1200.0);
        seedCategory(desserts, FoodCategory.DESSERT, 250.0, 600.0);
        seedCategory(beverages, FoodCategory.BEVERAGE, 100.0, 400.0);
    }

    private void seedCategory(String[] names, FoodCategory category, double minPrice, double maxPrice) {
        Random rand = new Random();
        for (String name : names) {
            FoodItem item = new FoodItem();
            item.setFoodName(name);
            item.setCategory(category);
            item.setPrice(Math.round((minPrice + (maxPrice - minPrice) * rand.nextDouble()) * 10.0) / 10.0);
            foodItemRepository.save(item);
        }
    }
}
