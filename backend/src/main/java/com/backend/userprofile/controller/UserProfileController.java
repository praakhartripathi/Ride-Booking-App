package com.backend.userprofile.controller;

import com.backend.userprofile.dto.UpdateProfileRequest;
import com.backend.userprofile.dto.UserProfileDto;
import com.backend.userprofile.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<UserProfileDto> getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userProfileService.getUserProfile(email));
    }

    @PutMapping
    public ResponseEntity<UserProfileDto> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(userProfileService.updateUserProfile(email, request));
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            Authentication authentication,
            @Valid @RequestBody com.backend.userprofile.dto.UpdatePasswordRequest request) {
        String email = authentication.getName();
        userProfileService.updatePassword(email, request, passwordEncoder);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/picture")
    public ResponseEntity<Map<String, String>> uploadProfilePicture(
            Authentication authentication,
            @RequestParam("file") MultipartFile file) {
        String email = authentication.getName();
        
        // Validate file
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "File cannot be empty"));
        }
        
        final long MAX_PROFILE_PIC_BYTES = 5 * 1024 * 1024; // 5MB
        if (file.getSize() > MAX_PROFILE_PIC_BYTES) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "File size exceeds 5MB limit"));
        }
        
        String contentType = file.getContentType();
        if (contentType == null || !(contentType.equals("image/jpeg") || contentType.equals("image/png"))) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Only JPEG and PNG images are allowed"));
        }
        
        String fileUrl = userProfileService.uploadProfilePicture(email, file);
        return ResponseEntity.ok(Collections.singletonMap("profilePictureUrl", fileUrl));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMyProfile(Authentication authentication) {
        String email = authentication.getName();
        userProfileService.deleteAccount(email);
        return ResponseEntity.ok().build();
    }
}
