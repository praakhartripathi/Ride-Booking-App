CREATE DATABASE IF NOT EXISTS ride_booking;

USE ride_booking;

-- Users table (Rider / Driver / Admin)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Driver profile table
CREATE TABLE driver_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    vehicle_number VARCHAR(20),
    vehicle_type VARCHAR(50),
    license_number VARCHAR(50),
    is_available BOOLEAN DEFAULT TRUE,
    rating DOUBLE DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Locations
CREATE TABLE locations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    latitude DOUBLE,
    longitude DOUBLE,
    address VARCHAR(255)
);

-- Rides table
CREATE TABLE rides (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rider_id BIGINT,
    driver_id BIGINT,
    pickup_location_id BIGINT,
    drop_location_id BIGINT,
    status VARCHAR(20),
    fare DOUBLE,
    distance DOUBLE,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (rider_id) REFERENCES users(id),
    FOREIGN KEY (driver_id) REFERENCES users(id),
    FOREIGN KEY (pickup_location_id) REFERENCES locations(id),
    FOREIGN KEY (drop_location_id) REFERENCES locations(id)
);

-- Payments
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ride_id BIGINT,
    amount DOUBLE,
    payment_method VARCHAR(20),
    payment_status VARCHAR(20),
    paid_at TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rides(id)
);