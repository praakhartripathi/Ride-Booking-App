# Database - Ride-Booking App

This module contains the raw SQL scripts and mock data generation files for the application's MySQL 8.0 instance.

## 💾 Core Infrastructure (MySQL 8.0)
The database structure is primarily built for a QRide-like ride-booking or delivery platform.

## 🗃️ Key Files
1. **`schema.sql`**: Contains the complete schema creation syntax. Use this to quickly spin up instances if not using Flyway.
2. **`data.sql`**: Automatically inserts test entries (A dummy Rider, Driver, Admin, and sample OTP/Refresh tokens) for immediate testing capability.

## 📌 Entities and Data Modeling
- **Users**: Tracks the primary actors (`RIDER`, `DRIVER`, `ADMIN`), login hashes, and active status. 
- **Verification Codes**: Maintains all OTP (One-Time Password) states (Phone/Email) alongside their generation timestamp, expiry windows, and used flags.
- **Refresh Tokens**: Tracks issued JSON Web Tokens. Used to permanently revoke access dynamically when users sign out across various connected devices (e.g. invalidating old iPhones).

## 🛩 Database Migrations
Although the raw SQL files sit inside this directory, the actual database instantiation is handled via **Flyway** within the Spring Boot Application context (see `backend/src/main/resources/db/migration/`). 

### Running The Database Locally
If you are developing locally, execute this in the project root:
```bash
docker-compose up -d mysql
```
It will map the container's standard SQL port to your host machine's `3307` to avoid conflicts with local dev setups!
