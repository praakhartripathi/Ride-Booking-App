package com.backend.ride.service;

import com.backend.auth.entity.Role;
import com.backend.auth.entity.User;
import com.backend.auth.repository.UserRepository;
import com.backend.driver.service.DriverService;
import com.backend.ride.dto.CreateRideRequest;
import com.backend.ride.dto.RideResponse;
import com.backend.ride.entity.Ride;
import com.backend.ride.entity.RideStatus;
import com.backend.ride.repository.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;
    private final DriverService driverService;

    @Transactional
    public RideResponse createRide(String riderEmail, CreateRideRequest request) {
        User rider = getUserByEmail(riderEmail);

        if (rider.getRole() != Role.RIDER) {
            throw new AccessDeniedException("Only riders can create rides");
        }

        Ride ride = Ride.builder()
                .rider(rider)
                .pickupLocation(request.getPickupLocation().trim())
                .dropoffLocation(request.getDropoffLocation().trim())
                .scheduledAt(request.getScheduledAt())
                .estimatedFare(request.getEstimatedFare())
                .riderNotes(normalizeNotes(request.getRiderNotes()))
                .status(RideStatus.REQUESTED)
                .build();

        return mapToDto(rideRepository.save(ride));
    }

    @Transactional(readOnly = true)
    public List<RideResponse> getMyRides(String email) {
        User user = getUserByEmail(email);

        if (user.getRole() == Role.DRIVER) {
            return rideRepository.findByDriverOrderByCreatedAtDesc(user)
                    .stream()
                    .map(this::mapToDto)
                    .toList();
        }

        return rideRepository.findByRiderOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<RideResponse> getOpenRides() {
        return rideRepository.findByStatusOrderByCreatedAtDesc(RideStatus.REQUESTED)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public RideResponse getRideById(String email, Long rideId) {
        User currentUser = getUserByEmail(email);
        Ride ride = getRideEntityById(rideId);

        validateRideAccess(currentUser, ride);
        return mapToDto(ride);
    }

    @Transactional
    public RideResponse acceptRide(String driverEmail, Long rideId) {
        User driver = getUserByEmail(driverEmail);
        Ride ride = getRideEntityById(rideId);

        if (driver.getRole() != Role.DRIVER) {
            throw new AccessDeniedException("Only drivers can accept rides");
        }
        if (ride.getStatus() != RideStatus.REQUESTED) {
            throw new RuntimeException("Ride is not available for acceptance");
        }

        driverService.getRequiredAvailableDriverProfile(driver);
        ride.setDriver(driver);
        ride.setStatus(RideStatus.ACCEPTED);
        driverService.markAvailability(driver, false);
        return mapToDto(ride);
    }

    @Transactional
    public RideResponse cancelRide(String riderEmail, Long rideId) {
        User rider = getUserByEmail(riderEmail);
        Ride ride = getRideEntityById(rideId);

        if (!ride.getRider().getId().equals(rider.getId())) {
            throw new AccessDeniedException("You can only cancel your own rides");
        }
        if (ride.getStatus() == RideStatus.COMPLETED || ride.getStatus() == RideStatus.CANCELLED) {
            throw new RuntimeException("Ride can no longer be cancelled");
        }

        if (ride.getDriver() != null) {
            driverService.markAvailability(ride.getDriver(), true);
        }
        ride.setStatus(RideStatus.CANCELLED);
        return mapToDto(ride);
    }

    @Transactional
    public RideResponse completeRide(String driverEmail, Long rideId) {
        User driver = getUserByEmail(driverEmail);
        Ride ride = getRideEntityById(rideId);

        if (driver.getRole() != Role.DRIVER) {
            throw new AccessDeniedException("Only drivers can complete rides");
        }
        if (ride.getDriver() == null || !ride.getDriver().getId().equals(driver.getId())) {
            throw new AccessDeniedException("This ride is not assigned to you");
        }
        if (ride.getStatus() != RideStatus.ACCEPTED && ride.getStatus() != RideStatus.IN_PROGRESS) {
            throw new RuntimeException("Ride is not in a completable state");
        }

        ride.setStatus(RideStatus.COMPLETED);
        driverService.markAvailability(driver, true);
        return mapToDto(ride);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Ride getRideEntityById(Long rideId) {
        return rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }

    private void validateRideAccess(User currentUser, Ride ride) {
        boolean isRider = ride.getRider().getId().equals(currentUser.getId());
        boolean isAssignedDriver = ride.getDriver() != null && ride.getDriver().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;

        if (!isRider && !isAssignedDriver && !isAdmin) {
            throw new AccessDeniedException("You do not have access to this ride");
        }
    }

    private String normalizeNotes(String riderNotes) {
        if (riderNotes == null) {
            return null;
        }

        String trimmed = riderNotes.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private RideResponse mapToDto(Ride ride) {
        return RideResponse.builder()
                .id(ride.getId())
                .riderId(ride.getRider().getId())
                .riderEmail(ride.getRider().getEmail())
                .driverId(ride.getDriver() != null ? ride.getDriver().getId() : null)
                .driverEmail(ride.getDriver() != null ? ride.getDriver().getEmail() : null)
                .pickupLocation(ride.getPickupLocation())
                .dropoffLocation(ride.getDropoffLocation())
                .scheduledAt(ride.getScheduledAt())
                .estimatedFare(ride.getEstimatedFare())
                .riderNotes(ride.getRiderNotes())
                .status(ride.getStatus())
                .createdAt(ride.getCreatedAt())
                .updatedAt(ride.getUpdatedAt())
                .build();
    }
}
