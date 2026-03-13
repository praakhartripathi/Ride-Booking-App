-- Clear existing data if necessary (order matters for foreign keys)
DELETE FROM refresh_tokens;
DELETE FROM verification_codes;
DELETE FROM user_profiles;
DELETE FROM users;

-- 1. Insert standard users
-- Note: password hashes are all 'password123' bcrypt encoded for testing
INSERT INTO users (id, email, phone_number, password_hash, role, status) VALUES 
(1, 'rider@example.com', '+1111111111', '$2a$10$eIy5hYfT.2dO6aU5QxT2L.rPzS7K2tH5q8lP3rS1q4w.Q.yC9JNmO', 'RIDER', 'ACTIVE'),
(2, 'driver@example.com', '+2222222222', '$2a$10$eIy5hYfT.2dO6aU5QxT2L.rPzS7K2tH5q8lP3rS1q4w.Q.yC9JNmO', 'DRIVER', 'ACTIVE'),
(3, 'admin@example.com', '+3333333333', '$2a$10$eIy5hYfT.2dO6aU5QxT2L.rPzS7K2tH5q8lP3rS1q4w.Q.yC9JNmO', 'ADMIN', 'ACTIVE');

-- 2. Insert user profiles
INSERT INTO user_profiles (user_id, first_name, last_name, profile_picture_url) VALUES
(1, 'John', 'Rider', NULL),
(2, 'Jane', 'Driver', NULL),
(3, 'Super', 'Admin', NULL);

-- 3. Insert mock verification codes (e.g., for email verification)
INSERT INTO verification_codes (user_id, identifier, code, type, expires_at) VALUES
(1, 'rider@example.com', '123456', 'EMAIL_VERIFICATION', DATE_ADD(NOW(), INTERVAL 15 MINUTE));

-- Insert sample active refresh token
INSERT INTO refresh_tokens (user_id, token, device_info, ip_address, expires_at) VALUES
(2, 'sample_refresh_token_string_for_bob_driver', 'iPhone 13', '192.168.1.100', DATE_ADD(NOW(), INTERVAL 7 DAY));
