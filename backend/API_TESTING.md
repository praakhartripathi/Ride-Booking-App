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

## 4. Test a Secured Endpoint (Example)
*Note: You will need to implement a dummy protected endpoint (e.g., `/api/users/me`) to test this properly.*

First, copy the `accessToken` returned from the Login or Register response. Then use it in the Authorization header:

```bash
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>"
```

**Expected Response (403 Forbidden without token, 200 OK with valid token):**

---

### Troubleshooting
- **403 Forbidden:** Ensure you are passing the exact base URL and headers. If you receive this on `/api/auth/register` or `/api/auth/login`, check your `SecurityConfig.java` to ensure the `.requestMatchers("/api/auth/**").permitAll()` is correctly applied.
- **500 Internal Server Error:** Check the Spring Boot console output. Usually indicates an empty database property, a duplicate unique field (e.g., trying to register the same email twice), or a misconfigured JWT secret key.
