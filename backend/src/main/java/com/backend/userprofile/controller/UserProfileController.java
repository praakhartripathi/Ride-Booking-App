package com.backend.userprofile.controller;

import com.backend.userprofile.dto.UpdateProfileRequest;
import com.backend.userprofile.dto.UserProfileDto;
import com.backend.userprofile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping
    public ResponseEntity<UserProfileDto> getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userProfileService.getUserProfile(email));
    }

    @PutMapping
    public ResponseEntity<UserProfileDto> updateMyProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(userProfileService.updateUserProfile(email, request));
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            Authentication authentication,
            @RequestBody com.backend.userprofile.dto.UpdatePasswordRequest request,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        String email = authentication.getName();
        userProfileService.updatePassword(email, request, passwordEncoder);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/picture")
    public ResponseEntity<java.util.Map<String, String>> uploadProfilePicture(
            Authentication authentication,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        String email = authentication.getName();
        String fileUrl = userProfileService.uploadProfilePicture(email, file);
        return ResponseEntity.ok(java.util.Collections.singletonMap("profilePictureUrl", fileUrl));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMyProfile(Authentication authentication) {
        String email = authentication.getName();
        userProfileService.deleteProfile(email);
        return ResponseEntity.ok().build();
    }
}
