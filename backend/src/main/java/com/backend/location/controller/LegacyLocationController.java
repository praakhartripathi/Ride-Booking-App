package com.backend.location.controller;

import com.backend.location.dto.DistanceTimeResponse;
import com.backend.location.dto.LocationCoordinatesResponse;
import com.backend.location.dto.LocationSuggestionResponse;
import com.backend.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LegacyLocationController {

    private final LocationService locationService;

    @GetMapping("/suggestions")
    public ResponseEntity<List<LocationSuggestionResponse>> getSuggestions(
            @RequestParam("q") String query,
            @RequestParam(value = "limit", required = false) Integer limit) {
        return ResponseEntity.ok(locationService.searchLocations(query, limit));
    }

    @GetMapping("/coordinates")
    public ResponseEntity<LocationCoordinatesResponse> getCoordinates(
            @RequestParam("q") String query) {
        return ResponseEntity.ok(locationService.getCoordinates(query));
    }

    @GetMapping("/distance-time")
    public ResponseEntity<DistanceTimeResponse> getDistanceTime(
            @RequestParam("origin") String origin,
            @RequestParam("destination") String destination) {
        return ResponseEntity.ok(locationService.getDistanceTime(origin, destination));
    }
}
