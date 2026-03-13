package com.backend.location.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationSuggestionResponse {
    private String city;
    private String state;
    private String country;
    private String label;
}
