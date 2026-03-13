package com.backend.location.model;

public record LocationRecord(
        String city,
        String state,
        String country
) {
    public String label() {
        return city + ", " + state + ", " + country;
    }
}
