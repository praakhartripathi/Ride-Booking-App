package com.backend.userprofile.service;

import com.backend.auth.entity.User;
import com.backend.auth.repository.UserRepository;
import com.backend.userprofile.dto.UpdatePasswordRequest;
import com.backend.userprofile.dto.UpdateProfileRequest;
import com.backend.userprofile.dto.UserProfileDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;

    public UserProfileDto getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToDto(user);
    }

    @Transactional
    public UserProfileDto updateUserProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getProfile() == null) {
            user.setProfile(new com.backend.userprofile.entity.UserProfile());
            user.getProfile().setUser(user);
        }

        if (request.getFirstName() != null && !request.getFirstName().trim().isEmpty()) {
            user.getProfile().setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null && !request.getLastName().trim().isEmpty()) {
            user.getProfile().setLastName(request.getLastName());
        }
        if (request.getProfilePictureUrl() != null && !request.getProfilePictureUrl().trim().isEmpty()) {
            user.getProfile().setProfilePictureUrl(request.getProfilePictureUrl());
        }

        // The @Transactional annotation ensures changes are saved to the database.
        return mapToDto(user);
    }

    @Transactional
    public void updatePassword(String email, UpdatePasswordRequest request, org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new org.springframework.security.authentication.BadCredentialsException("Incorrect current password");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
    }

    @Transactional
    public String uploadProfilePicture(String email, org.springframework.web.multipart.MultipartFile file) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getProfile() == null) {
            user.setProfile(new com.backend.userprofile.entity.UserProfile());
            user.getProfile().setUser(user);
        }

        if (file.isEmpty()) {
            throw new RuntimeException("Failed to store empty file.");
        }

        try {
            // Ensure uploads directory exists
            java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads/profile-pictures");
            if (!java.nio.file.Files.exists(uploadDir)) {
                java.nio.file.Files.createDirectories(uploadDir);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.lastIndexOf(".") > 0) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String newFilename = java.util.UUID.randomUUID().toString() + extension;

            // Save file
            java.nio.file.Path targetLocation = uploadDir.resolve(newFilename);
            java.nio.file.Files.copy(file.getInputStream(), targetLocation, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            // Update user profile with URL (In real app, this might be S3 URL. Here we use local path/endpoint)
            String fileUrl = "/api/users/profile-pictures/" + newFilename;
            user.getProfile().setProfilePictureUrl(fileUrl);
            
            return fileUrl;

        } catch (java.io.IOException ex) {
            throw new RuntimeException("Failed to store file.", ex);
        }
    }

    @Transactional
    public void deleteProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // This will cascade delete verification codes and refresh tokens
        // due to the ON DELETE CASCADE configuration in the schema / entities
        userRepository.delete(user);
    }

    private UserProfileDto mapToDto(User user) {
        String firstName = user.getProfile() != null ? user.getProfile().getFirstName() : "";
        String lastName = user.getProfile() != null ? user.getProfile().getLastName() : "";
        String profilePictureUrl = user.getProfile() != null ? user.getProfile().getProfilePictureUrl() : null;

        return UserProfileDto.builder()
                .id(user.getId())
                .firstName(firstName)
                .lastName(lastName)
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .profilePictureUrl(profilePictureUrl)
                .status(user.getStatus().name())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
