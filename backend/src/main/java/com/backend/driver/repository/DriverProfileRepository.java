package com.backend.driver.repository;

import com.backend.auth.entity.User;
import com.backend.driver.entity.DriverProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverProfileRepository extends JpaRepository<DriverProfile, Long> {
    Optional<DriverProfile> findByUser(User user);
    boolean existsByLicenseNumber(String licenseNumber);
    boolean existsByVehiclePlateNumber(String vehiclePlateNumber);
    List<DriverProfile> findByAvailableTrueOrderByRatingDesc();
}
