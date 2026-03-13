package com.backend.driver.controller;

import com.backend.driver.dto.DriverProfileResponse;
import com.backend.driver.dto.UpdateDriverAvailabilityRequest;
import com.backend.driver.dto.UpsertDriverProfileRequest;
import com.backend.driver.service.DriverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    @PutMapping("/me")
    public ResponseEntity<DriverProfileResponse> upsertMyDriverProfile(
            Authentication authentication,
            @Valid @RequestBody UpsertDriverProfileRequest request) {
        return ResponseEntity.ok(driverService.upsertMyDriverProfile(authentication.getName(), request));
    }

    @GetMapping("/me")
    public ResponseEntity<DriverProfileResponse> getMyDriverProfile(Authentication authentication) {
        return ResponseEntity.ok(driverService.getMyDriverProfile(authentication.getName()));
    }

    @PatchMapping("/me/availability")
    public ResponseEntity<DriverProfileResponse> updateAvailability(
            Authentication authentication,
            @Valid @RequestBody UpdateDriverAvailabilityRequest request) {
        return ResponseEntity.ok(driverService.updateAvailability(authentication.getName(), request));
    }

    @GetMapping("/available")
    public ResponseEntity<List<DriverProfileResponse>> getAvailableDrivers() {
        return ResponseEntity.ok(driverService.getAvailableDrivers());
    }
}
