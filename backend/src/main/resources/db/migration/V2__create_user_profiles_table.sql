-- 1. Create the new user_profiles table
CREATE TABLE user_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_picture_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 2. Migrate existing data from users to user_profiles
INSERT INTO user_profiles (user_id, first_name, last_name, profile_picture_url)
SELECT id, first_name, last_name, profile_picture_url FROM users;

-- 3. Drop the columns from the users table safely
ALTER TABLE users 
DROP COLUMN first_name, 
DROP COLUMN last_name, 
DROP COLUMN profile_picture_url;
