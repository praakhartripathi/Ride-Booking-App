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

        if (request.getFirstName() != null) {
            String firstName = request.getFirstName().trim();
            if (!firstName.isEmpty()) {
                user.getProfile().setFirstName(firstName);
            }
        }
        if (request.getLastName() != null) {
            String lastName = request.getLastName().trim();
            if (!lastName.isEmpty()) {
                user.getProfile().setLastName(lastName);
            }
        }
        if (request.getProfilePictureUrl() != null) {
            String profilePictureUrl = request.getProfilePictureUrl().trim();
            if (!profilePictureUrl.isEmpty()) {
                user.getProfile().setProfilePictureUrl(profilePictureUrl);
            }
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
        
        // Validate file size (max 5MB)
        final long MAX_PROFILE_PIC_BYTES = 5 * 1024 * 1024;
        if (file.getSize() > MAX_PROFILE_PIC_BYTES) {
            throw new RuntimeException("File size exceeds 5MB limit.");
        }
        
        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !(contentType.equals("image/jpeg") || contentType.equals("image/png"))) {
            throw new RuntimeException("Only JPEG and PNG images are allowed.");
        }

        try {
            // Ensure uploads directory exists
            java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads/profile-pictures");
            if (!java.nio.file.Files.exists(uploadDir)) {
                java.nio.file.Files.createDirectories(uploadDir);
            }

            // Generate unique filename with validation
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.lastIndexOf(".") > 0) {
                extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
                // Whitelist allowed extensions
                if (!extension.matches("\\.(jpg|jpeg|png|gif)$")) {
                    throw new RuntimeException("Invalid file extension. Only .jpg, .jpeg, .png, and .gif are allowed.");
                }
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
    public void deleteAccount(String email) {
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
