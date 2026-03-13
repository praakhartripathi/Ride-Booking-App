package com.backend.driver.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpsertDriverProfileRequest {

    @NotBlank(message = "License number is required")
    @Size(max = 100, message = "License number must not exceed 100 characters")
    private String licenseNumber;

    @NotBlank(message = "Vehicle model is required")
    @Size(max = 120, message = "Vehicle model must not exceed 120 characters")
    private String vehicleModel;

    @NotBlank(message = "Vehicle plate number is required")
    @Size(max = 40, message = "Vehicle plate number must not exceed 40 characters")
    private String vehiclePlateNumber;

    @NotBlank(message = "Vehicle color is required")
    @Size(max = 60, message = "Vehicle color must not exceed 60 characters")
    private String vehicleColor;

    @NotNull(message = "Availability flag is required")
    private Boolean available;

    @NotNull(message = "Rating is required")
    @DecimalMin(value = "0.00", message = "Rating must be at least 0")
    @DecimalMax(value = "5.00", message = "Rating must not exceed 5")
    private BigDecimal rating;
}
