package com.backend.ride.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class CreateRideRequest {

    @NotBlank(message = "Pickup location is required")
    @Size(max = 255, message = "Pickup location must not exceed 255 characters")
    private String pickupLocation;

    @NotBlank(message = "Dropoff location is required")
    @Size(max = 255, message = "Dropoff location must not exceed 255 characters")
    private String dropoffLocation;

    @Future(message = "Scheduled time must be in the future")
    private LocalDateTime scheduledAt;

    @NotNull(message = "Estimated fare is required")
    @DecimalMin(value = "0.00", inclusive = false, message = "Estimated fare must be greater than 0")
    private BigDecimal estimatedFare;

    @Size(max = 500, message = "Rider notes must not exceed 500 characters")
    private String riderNotes;
}
