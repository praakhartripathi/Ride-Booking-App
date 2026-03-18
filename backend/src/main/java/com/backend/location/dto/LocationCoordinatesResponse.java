package com.backend.location.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationCoordinatesResponse {
    private String query;
    private String label;
    private double latitude;
    private double longitude;
    private boolean approximated;
}
