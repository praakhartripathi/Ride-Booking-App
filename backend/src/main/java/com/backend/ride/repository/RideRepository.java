package com.backend.ride.repository;

import com.backend.auth.entity.User;
import com.backend.ride.entity.Ride;
import com.backend.ride.entity.RideStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findByRiderOrderByCreatedAtDesc(User rider);
    List<Ride> findByDriverOrderByCreatedAtDesc(User driver);
    List<Ride> findByStatusOrderByCreatedAtDesc(RideStatus status);
}
