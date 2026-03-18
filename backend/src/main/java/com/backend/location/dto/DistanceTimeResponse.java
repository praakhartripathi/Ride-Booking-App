package com.backend.location.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DistanceTimeResponse {
    private String origin;
    private String destination;
    private double distanceKm;
    private int durationMinutes;
    private boolean approximated;
}
