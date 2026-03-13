package com.backend.ride.dto;

import com.backend.ride.entity.RideStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideResponse {
    private Long id;
    private Long riderId;
    private String riderEmail;
    private Long driverId;
    private String driverEmail;
    private String pickupLocation;
    private String dropoffLocation;
    private LocalDateTime scheduledAt;
    private BigDecimal estimatedFare;
    private String riderNotes;
    private RideStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
