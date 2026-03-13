Ride Booking App – Detailed Development Checklist
Tech Stack: Spring Boot + React + MySQL + Docker

==================================================

1. Project Setup
   ==================================================
   [ ] Create main project folder
   ride-booking-app/

[ ] Create subfolders
backend/
frontend/
docker/
docs/

[ ] Initialize Git repository
git init

[ ] Create .gitignore
ignore:
- node_modules
- target
- .env
- build

[ ] Create README.md

[ ] Setup environment files
backend/.env
frontend/.env

==================================================
2. Backend Setup (Spring Boot)
==============================

[ ] Create Spring Boot project using Spring Initializr
Group: com.rideapp
Artifact: ride-backend

[ ] Add dependencies
[ ] Spring Web
[ ] Spring Data JPA
[ ] Spring Security
[ ] MySQL Driver
[ ] Lombok
[ ] Validation
[ ] JWT (jjwt)

[ ] Create base package structure
controller/
service/
repository/
entity/
dto/
security/
config/
util/

[ ] Configure application.properties

```
spring.datasource.url=jdbc:mysql://localhost:3306/ride_db
spring.datasource.username=root
spring.datasource.password=pass
spring.jpa.hibernate.ddl-auto=update
```

[ ] Start backend server
mvn spring-boot:run

[ ] Verify API running
http://localhost:8080

==================================================
3. Database Design
==================

[ ] Create database
ride_db

[ ] Design tables

User
id
name
email
password
phone

Captain
id
name
email
password
vehicle_type
vehicle_number
status

Ride
id
user_id
captain_id
pickup_location
destination_location
distance
duration
ride_status

[ ] Define relationships
Ride → User (ManyToOne)
Ride → Captain (ManyToOne)

==================================================
4. User Authentication
======================

[ ] Create User entity

[ ] Fields
id
name
email
password
phone

[ ] Add JPA annotations
@Entity
@Table
@Id
@GeneratedValue

[ ] Create UserRepository
extends JpaRepository

[ ] Create UserService

[ ] Methods
registerUser()
loginUser()
findByEmail()

[ ] Create AuthController

[ ] Implement API
POST /api/auth/register

[ ] Implement API
POST /api/auth/login

[ ] Hash password using BCryptPasswordEncoder

[ ] Generate JWT token after login

==================================================
5. User Profile & Logout
========================

[ ] Create endpoint
GET /api/users/profile

[ ] Create JWT authentication filter

[ ] Extract token from Authorization header

[ ] Validate JWT token

[ ] Load user details

[ ] Configure Spring Security

[ ] Protect routes except:
/auth/login
/auth/register

[ ] Create logout endpoint
POST /api/auth/logout

==================================================
6. Captain Authentication
=========================

[ ] Create Captain entity

[ ] Fields
id
name
email
password
vehicle_type
vehicle_number
availability

[ ] Create CaptainRepository

[ ] Create CaptainService

[ ] Implement APIs

```
POST /api/captain/register
POST /api/captain/login
```

[ ] Encrypt captain passwords

[ ] Generate JWT token for captain login

==================================================
7. Frontend Setup (React)
=========================

[ ] Create React project
npm create vite@latest frontend

[ ] Install dependencies
npm install react-router-dom
npm install axios
npm install tailwindcss

[ ] Setup folder structure

```
src/
    components/
    pages/
    services/
    context/
    utils/
```

[ ] Setup React Router

Pages
/login
/register
/home
/captain
/ride

[ ] Create API service using Axios

==================================================
8. User Forms
=============

[ ] Create Register page

Fields
name
email
phone
password

[ ] Create Login page

Fields
email
password

[ ] Add form validation

[ ] Connect forms to backend APIs

[ ] Store JWT token

```
localStorage.setItem("token")
```

==================================================
9. Captain Forms
================

[ ] Create Captain Register page

Fields
name
email
password
vehicle_type
vehicle_number

[ ] Create Captain Login page

[ ] Handle authentication state

[ ] Store captain token

==================================================
10. Integrate User APIs
=======================

[ ] Connect register API

[ ] Connect login API

[ ] Save token in localStorage

[ ] Add Axios interceptor

[ ] Attach Authorization header

[ ] Protect user routes

==================================================
11. Integrate Captain APIs
==========================

[ ] Connect captain register API

[ ] Connect captain login API

[ ] Manage captain authentication state

[ ] Protect captain routes

==================================================
12. User Home UI
================

[ ] Create User Home page

[ ] Add inputs

```
Pickup Location
Destination
```

[ ] Add "Find Ride" button

[ ] Display suggestions dropdown

==================================================
13. Location Search Panel
=========================

[ ] Create suggestion component

[ ] Call backend API
/api/location/suggestions

[ ] Show location suggestions

[ ] Allow user selection

==================================================
14. Complete User Home UI
=========================

[ ] Show ride types

```
Bike
Mini
Sedan
```

[ ] Display estimated time

[ ] Display estimated distance

[ ] Add confirm ride button

==================================================
15. Captain Dashboard
=====================

[ ] Create Captain Home page

[ ] Show available ride requests

[ ] Add Accept Ride button

[ ] Show ride details

==================================================
16. Google Maps Integration
===========================

[ ] Enable Google Maps API

[ ] Generate API key

[ ] Install library
npm install @react-google-maps/api

[ ] Display map

[ ] Show pickup marker

[ ] Show destination marker

[ ] Draw route between locations

==================================================
17. Location Services (Backend)
===============================

[ ] Create LocationController

Endpoints

[ ] GET /api/location/suggestions

[ ] GET /api/location/coordinates

[ ] GET /api/location/distance-time

[ ] Call Google Maps API

[ ] Return formatted JSON response

==================================================
18. Ride System
===============

[ ] Create Ride entity

Fields
id
user
captain
pickup
destination
distance
duration
status

[ ] Create RideRepository

[ ] Create RideService

Methods

```
createRide()
findNearbyCaptain()
assignCaptain()
updateRideStatus()
```

[ ] Create RideController

Endpoints

```
POST /api/rides/create
GET /api/rides/user
GET /api/rides/captain
```

==================================================
19. Final Integration
=====================

[ ] User sends ride request

[ ] Backend creates ride record

[ ] Find available captain

[ ] Send ride request to captain

[ ] Captain accepts ride

[ ] Update ride status

==================================================
20. Docker Setup
================

[ ] Create Dockerfile for Spring Boot

[ ] Build backend image

[ ] Create Dockerfile for React

[ ] Build frontend image

[ ] Create docker-compose.yml

Services

```
backend
frontend
mysql
```

[ ] Run project

```
docker-compose up --build
```

==================================================
21. Testing
===========

[ ] Test register API

[ ] Test login API

[ ] Test JWT authentication

[ ] Test ride creation

[ ] Test captain ride acceptance

[ ] Test Google Maps API

[ ] Fix bugs

==================================================
22. Deployment Preparation
==========================

[ ] Clean unused code

[ ] Add environment variables

[ ] Write project README

[ ] Add API documentation

[ ] Prepare project for deployment
