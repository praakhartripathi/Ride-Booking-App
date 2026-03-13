# Authentication API Testing Guide

This guide contains `curl` commands to test the authentication endpoints for the Ride-Booking App.

## 1. Register a New User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+19876543210",
    "password": "securepassword123",
    "role": "RIDER"
  }'
```

**Expected Response (200 OK):**
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG...",
  "userId": 1,
  "email": "john.doe@example.com",
  "role": "RIDER"
}
```

---

## 2. Login as the User (using Email)

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

---

## 3. Login as the User (using Phone Number)

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "+19876543210",
    "password": "securepassword123"
  }'
```

**Expected Response (200 OK):**
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG...",
  "userId": 1,
  "email": "john.doe@example.com",
  "role": "RIDER"
}
```

---

## 4. Get User Profile

```bash
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>"
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+19876543210",
  "role": "RIDER",
  "profilePictureUrl": null,
  "status": "ACTIVE",
  "createdAt": "2024-03-12T10:00:00"
}
```

---

## 5. Update User Profile

```bash
curl -X PUT http://localhost:8080/api/users/me \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Johnny",
    "lastName": "Depp",
    "profilePictureUrl": "https://example.com/avatar.jpg"
  }'
```

**Expected Response (200 OK):**
Returns the updated `UserProfileDto`.

---

## 6. Update Password

```bash
curl -X PUT http://localhost:8080/api/users/me/password \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "securepassword123",
    "newPassword": "newsuperpassword456"
  }'
```

**Expected Response (200 OK):**
Returns an empty 200 OK if successful. (400 or 500 block if `currentPassword` is incorrect).

---

## 7. Logout

```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<YOUR_REFRESH_TOKEN_HERE>"
  }'
```

**Expected Response (200 OK):**
Logs the user out (invalidates token on client-side and optionally on server-side).

---

## 8. Upload Profile Picture

```bash
curl -X POST http://localhost:8080/api/users/me/picture \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>" \
  -F "file=@/path/to/your/image.jpg"
```

**Expected Response (200 OK):**
```json
{
  "profilePictureUrl": "/api/users/profile-pictures/uuid-filename.jpg"
}
```
*(You can view the image by navigating to `http://localhost:8080/api/users/profile-pictures/uuid-filename.jpg` in your browser!)*

---

## 9. Delete Profile

```bash
curl -X DELETE http://localhost:8080/api/users/me \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>"
```

**Expected Response (200 OK):**
Returns an empty 200 OK. Your account and all associated tokens/data are now deleted!

---

### Troubleshooting
- **403 Forbidden:** Ensure you are passing the exact base URL and headers. If you receive this on `/api/auth/register` or `/api/auth/login`, check your `SecurityConfig.java` to ensure the `.requestMatchers("/api/auth/**").permitAll()` is correctly applied.
- **500 Internal Server Error:** Check the Spring Boot console output. Usually indicates an empty database property, a duplicate unique field (e.g., trying to register the same email twice), or a misconfigured JWT secret key.
