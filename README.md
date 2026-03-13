Ride Booking App – Spring Boot + React + MySQL + Docker Task List

1. Project Setup

* Create project structure
* Backend: Spring Boot project (Spring Initializr)
* Frontend: React project (Vite or CRA)
* Setup Git repository
* Create environment configuration files

2. Backend Setup (Spring Boot)

* Add dependencies:

  * Spring Web
  * Spring Data JPA
  * Spring Security
  * MySQL Driver
  * Lombok
  * JWT library
* Configure application.properties
* Setup MySQL database connection
* Test server running on port

3. Database Design

* Create User table
* Create Captain table
* Create Ride table
* Define relationships
* Configure JPA entities

4. User Authentication

* Create User entity
* Create UserRepository
* Create UserService
* Implement user registration API
* Implement user login API
* Encrypt password using BCrypt
* Generate JWT token

5. User Profile & Logout

* Create profile endpoint
* Implement AuthUser filter (JWT filter)
* Secure APIs using Spring Security
* Implement logout functionality

6. Captain Authentication

* Create Captain entity
* Create CaptainRepository
* Create CaptainService
* Implement captain register API
* Implement captain login API
* Secure captain endpoints

7. Frontend Setup (React)

* Setup project structure
* Install dependencies

  * React Router
  * Axios
  * Tailwind / CSS
* Create routes for pages
* Setup API service

8. User Forms

* Create User Register form
* Create User Login form
* Validate input fields
* Store JWT token after login

9. Captain Forms

* Create Captain Register form
* Create Captain Login form
* Handle authentication state

10. Integrate User APIs

* Connect register API
* Connect login API
* Save token in localStorage
* Protect user routes

11. Integrate Captain APIs

* Connect captain register API
* Connect captain login API
* Manage captain authentication state

12. User Home UI

* Create User Home page
* Add pickup location input
* Add destination input
* Add ride search button

13. Location Search Panel

* Create suggestion dropdown
* Fetch location suggestions
* Select pickup and destination

14. Complete User Home UI

* Show ride options
* Display distance and time
* Confirm ride request

15. Captain Dashboard

* Create Captain Home screen
* Display ride requests
* Accept ride functionality

16. Google Maps Integration

* Enable Google Maps API
* Setup API keys
* Display map in frontend
* Show route between pickup and destination

17. Location Services (Backend)

* Create API for location suggestions
* Create getCoordinates endpoint
* Create distance & time calculation endpoint

18. Ride System

* Create Ride entity
* Create RideRepository
* Create RideService
* Create ride request API
* Assign captain to ride
* Manage ride status

19. Final Integration

* User sends ride request
* Backend processes ride
* Captain receives ride request
* Captain accepts ride
* Update ride status

20. Docker Setup

* Create Dockerfile for Spring Boot
* Create Dockerfile for React
* Create docker-compose.yml
* Setup MySQL container
* Run full project using Docker

21. Testing

* Test authentication APIs
* Test ride booking flow
* Test captain ride acceptance
* Fix bugs

22. Deployment Preparation

* Clean code
* Add README
* Document APIs
* Prepare project for deployment
