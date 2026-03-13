package com.backend.driver.service;

import com.backend.auth.entity.Role;
import com.backend.auth.entity.User;
import com.backend.auth.repository.UserRepository;
import com.backend.driver.dto.DriverProfileResponse;
import com.backend.driver.dto.UpdateDriverAvailabilityRequest;
import com.backend.driver.dto.UpsertDriverProfileRequest;
import com.backend.driver.entity.DriverProfile;
import com.backend.driver.repository.DriverProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverProfileRepository driverProfileRepository;
    private final UserRepository userRepository;

    @Transactional
    public DriverProfileResponse upsertMyDriverProfile(String email, UpsertDriverProfileRequest request) {
        User user = getDriverUser(email);
        DriverProfile driverProfile = driverProfileRepository.findByUser(user)
                .orElseGet(() -> DriverProfile.builder().user(user).build());

        validateUniqueFields(driverProfile, request);

        driverProfile.setLicenseNumber(request.getLicenseNumber().trim());
        driverProfile.setVehicleModel(request.getVehicleModel().trim());
        driverProfile.setVehiclePlateNumber(request.getVehiclePlateNumber().trim());
        driverProfile.setVehicleColor(request.getVehicleColor().trim());
        driverProfile.setAvailable(request.getAvailable());
        driverProfile.setRating(request.getRating());

        return mapToDto(driverProfileRepository.save(driverProfile));
    }

    @Transactional(readOnly = true)
    public DriverProfileResponse getMyDriverProfile(String email) {
        User user = getDriverUser(email);
        DriverProfile driverProfile = driverProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Driver profile not found"));

        return mapToDto(driverProfile);
    }

    @Transactional
    public DriverProfileResponse updateAvailability(String email, UpdateDriverAvailabilityRequest request) {
        User user = getDriverUser(email);
        DriverProfile driverProfile = driverProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Driver profile not found"));

        driverProfile.setAvailable(request.getAvailable());
        return mapToDto(driverProfile);
    }

    @Transactional(readOnly = true)
    public List<DriverProfileResponse> getAvailableDrivers() {
        return driverProfileRepository.findByAvailableTrueOrderByRatingDesc()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public DriverProfile getRequiredAvailableDriverProfile(User user) {
        DriverProfile driverProfile = driverProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Driver profile not found"));

        if (!driverProfile.isAvailable()) {
            throw new RuntimeException("Driver is currently unavailable");
        }

        return driverProfile;
    }

    @Transactional
    public void markAvailability(User user, boolean available) {
        driverProfileRepository.findByUser(user).ifPresent(driverProfile -> driverProfile.setAvailable(available));
    }

    private User getDriverUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.DRIVER) {
            throw new AccessDeniedException("Only drivers can access driver resources");
        }

        return user;
    }

    private void validateUniqueFields(DriverProfile currentProfile, UpsertDriverProfileRequest request) {
        boolean licenseChanged = currentProfile.getLicenseNumber() == null
                || !currentProfile.getLicenseNumber().equals(request.getLicenseNumber().trim());
        if (licenseChanged && driverProfileRepository.existsByLicenseNumber(request.getLicenseNumber().trim())) {
            throw new RuntimeException("License number is already in use");
        }

        boolean plateChanged = currentProfile.getVehiclePlateNumber() == null
                || !currentProfile.getVehiclePlateNumber().equals(request.getVehiclePlateNumber().trim());
        if (plateChanged && driverProfileRepository.existsByVehiclePlateNumber(request.getVehiclePlateNumber().trim())) {
            throw new RuntimeException("Vehicle plate number is already in use");
        }
    }

    private DriverProfileResponse mapToDto(DriverProfile driverProfile) {
        return DriverProfileResponse.builder()
                .id(driverProfile.getId())
                .userId(driverProfile.getUser().getId())
                .email(driverProfile.getUser().getEmail())
                .licenseNumber(driverProfile.getLicenseNumber())
                .vehicleModel(driverProfile.getVehicleModel())
                .vehiclePlateNumber(driverProfile.getVehiclePlateNumber())
                .vehicleColor(driverProfile.getVehicleColor())
                .available(driverProfile.isAvailable())
                .rating(driverProfile.getRating())
                .createdAt(driverProfile.getCreatedAt())
                .updatedAt(driverProfile.getUpdatedAt())
                .build();
    }
}
