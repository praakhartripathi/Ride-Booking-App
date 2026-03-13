package com.backend.ride.controller;

import com.backend.ride.dto.CreateRideRequest;
import com.backend.ride.dto.RideResponse;
import com.backend.ride.service.RideService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
public class RideController {

    private final RideService rideService;

    @PostMapping
    public ResponseEntity<RideResponse> createRide(
            Authentication authentication,
            @Valid @RequestBody CreateRideRequest request) {
        return ResponseEntity.ok(rideService.createRide(authentication.getName(), request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<RideResponse>> getMyRides(Authentication authentication) {
        return ResponseEntity.ok(rideService.getMyRides(authentication.getName()));
    }

    @GetMapping("/{rideId}")
    public ResponseEntity<RideResponse> getRideById(
            Authentication authentication,
            @PathVariable Long rideId) {
        return ResponseEntity.ok(rideService.getRideById(authentication.getName(), rideId));
    }

    @PatchMapping("/{rideId}/accept")
    public ResponseEntity<RideResponse> acceptRide(
            Authentication authentication,
            @PathVariable Long rideId) {
        return ResponseEntity.ok(rideService.acceptRide(authentication.getName(), rideId));
    }

    @PatchMapping("/{rideId}/cancel")
    public ResponseEntity<RideResponse> cancelRide(
            Authentication authentication,
            @PathVariable Long rideId) {
        return ResponseEntity.ok(rideService.cancelRide(authentication.getName(), rideId));
    }

    @PatchMapping("/{rideId}/complete")
    public ResponseEntity<RideResponse> completeRide(
            Authentication authentication,
            @PathVariable Long rideId) {
        return ResponseEntity.ok(rideService.completeRide(authentication.getName(), rideId));
    }
}
