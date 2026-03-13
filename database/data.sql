-- Insert sample users
INSERT INTO users (first_name, last_name, email, phone_number, password_hash, role, status) VALUES
('Alice', 'Rider', 'alice.rider@example.com', '+1234567890', '$2a$10$xyz', 'RIDER', 'ACTIVE'),
('Bob', 'Driver', 'bob.driver@example.com', '+0987654321', '$2a$10$xyz', 'DRIVER', 'ACTIVE'),
('Admin', 'User', 'admin@example.com', '+1122334455', '$2a$10$xyz', 'ADMIN', 'ACTIVE');

-- Insert sample verification code (e.g., for email verification)
INSERT INTO verification_codes (user_id, identifier, code, type, expires_at) VALUES
(1, 'alice.rider@example.com', '123456', 'EMAIL_VERIFICATION', DATE_ADD(NOW(), INTERVAL 15 MINUTE));

-- Insert sample active refresh token
INSERT INTO refresh_tokens (user_id, token, device_info, ip_address, expires_at) VALUES
(2, 'sample_refresh_token_string_for_bob_driver', 'iPhone 13', '192.168.1.100', DATE_ADD(NOW(), INTERVAL 7 DAY));
