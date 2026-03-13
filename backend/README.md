# Backend - Ride-Booking App

This module contains the Spring Boot 3 REST API for the application, built with a robust **Spring Security** and **JWT Authentication** implementation.

## 🚀 Built With
- **Java 17** & **Spring Boot 3.2.x**
- **Spring Security** (Stateless Bearer Tokens)
- **JSON Web Tokens (JJWT)** (HS256 encryption)
- **Spring Data JPA** (Hibernate)
- **Flyway** (Database Migrations)
- **Lombok** (Code reduction)
- **Spring Boot DevTools** (Hot Reloading)

## 🔑 Key Features
1. **Authentication Flow**
   - Public endpoints for `/api/auth/register` and `/api/auth/login`.
   - Checks against duplicate emails and phone numbers.
   - Generates both Access and Refresh Tokens upon successful authentication.
   - Provides a `CustomUserDetailsService` hooking Hibernate entities seamlessly into the Spring Context.

2. **Security Architecture**
   - Stateless session management (no traditional `JSESSIONID` cookies).
   - Custom `JwtAuthenticationFilter` verifying tokens on every protected request.

3. **Development Ergonomics**
   - Contains a traditional `Dockerfile` for final production builds.
   - Contains `Dockerfile.dev` specifically engineered for **Hot Reloading**.

## 🏃 Running the Backend

You do **not** need to install Java locally if you run this via the main `docker-compose.yml` situated in the project root!

However, if you wish to run it natively via Maven:
```bash
./mvnw clean install
./mvnw spring-boot:run
```

*(Note: Ensure you have a standard MySQL instance running locally on port `3306` with `ride_db` if you choose not to use Docker).*

## 🧪 Testing Endpoints
Refer to `API_TESTING.md` in this directory for exact cURL requests.
