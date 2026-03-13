package com.backend.location.controller;

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
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/search")
    public ResponseEntity<List<LocationSuggestionResponse>> searchLocations(
            @RequestParam("q") String query,
            @RequestParam(value = "limit", required = false) Integer limit) {
        return ResponseEntity.ok(locationService.searchLocations(query, limit));
    }
}
