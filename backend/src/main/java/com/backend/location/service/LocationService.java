package com.backend.location.service;

import com.backend.location.dto.LocationSuggestionResponse;
import com.backend.location.model.LocationRecord;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
@Slf4j
public class LocationService {

    private static final int DEFAULT_LIMIT = 8;
    private final List<LocationRecord> locationRecords = new ArrayList<>();

    @PostConstruct
    void loadLocations() {
        ClassPathResource resource = new ClassPathResource("locations/india_locations.csv");

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            reader.lines()
                    .skip(1)
                    .filter(line -> !line.isBlank())
                    .map(this::parseLine)
                    .forEach(locationRecords::add);
        } catch (Exception exception) {
            throw new IllegalStateException("Failed to load location dataset", exception);
        }

        log.info("Loaded {} location records", locationRecords.size());
    }

    public List<LocationSuggestionResponse> searchLocations(String query, Integer limit) {
        String normalizedQuery = query == null ? "" : query.trim().toLowerCase(Locale.ENGLISH);

        if (normalizedQuery.length() < 1) {
            return List.of();
        }

        int resultLimit = limit == null ? DEFAULT_LIMIT : Math.min(Math.max(limit, 1), 15);

        return locationRecords.stream()
                .filter(location -> matches(location, normalizedQuery))
                .sorted(Comparator
                        .comparing((LocationRecord location) -> startsWith(location.city(), normalizedQuery) ? 0 : 1)
                        .thenComparing(location -> startsWith(location.state(), normalizedQuery) ? 0 : 1)
                        .thenComparing(LocationRecord::city)
                        .thenComparing(LocationRecord::state))
                .limit(resultLimit)
                .map(this::mapToDto)
                .toList();
    }

    private boolean matches(LocationRecord location, String query) {
        return contains(location.city(), query)
                || contains(location.state(), query)
                || contains(location.label(), query);
    }

    private boolean contains(String value, String query) {
        return value.toLowerCase(Locale.ENGLISH).contains(query);
    }

    private boolean startsWith(String value, String query) {
        return value.toLowerCase(Locale.ENGLISH).startsWith(query);
    }

    private LocationRecord parseLine(String line) {
        String[] parts = line.split(",", -1);
        if (parts.length < 3) {
            throw new IllegalArgumentException("Invalid location row: " + line);
        }

        return new LocationRecord(parts[0].trim(), parts[1].trim(), parts[2].trim());
    }

    private LocationSuggestionResponse mapToDto(LocationRecord location) {
        return LocationSuggestionResponse.builder()
                .city(location.city())
                .state(location.state())
                .country(location.country())
                .label(location.label())
                .build();
    }
}
