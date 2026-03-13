package com.backend.auth.service;

import com.backend.auth.dto.AuthResponse;
import com.backend.auth.dto.LoginRequest;
import com.backend.auth.dto.LogoutRequest;
import com.backend.auth.dto.RegisterRequest;
import com.backend.auth.entity.Role;
import com.backend.auth.entity.User;
import com.backend.auth.entity.UserStatus;
import com.backend.auth.repository.UserRepository;
import com.backend.auth.security.CustomUserDetails;
import com.backend.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone number is already in use");
        }

        User user = User.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : Role.RIDER)
                .status(UserStatus.ACTIVE)
                .build();

        com.backend.userprofile.entity.UserProfile profile = com.backend.userprofile.entity.UserProfile.builder()
                .user(user)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .build();

        user.setProfile(profile);

        user = userRepository.save(user);

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return mapToDto(user, accessToken, refreshToken);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getIdentifier(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getIdentifier())
                .or(() -> userRepository.findByPhoneNumber(request.getIdentifier()))
                .orElseThrow(() -> new org.springframework.security.authentication.BadCredentialsException("Invalid credentials"));

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    @Transactional
    public void logout(String authHeader, LogoutRequest request) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String accessToken = authHeader.substring(7);
            // Optionally: Implement an external access token denylist (e.g., Redis)
        }

        if (request.getRefreshToken() != null) {
            // Usually, you lookup the refresh token in the repository,
            // verify it belongs to the user, and revoke/delete it.
            // refreshTokenRepository.findByToken(request.getRefreshToken()).ifPresent(token -> {
            //     token.setRevokedAt(LocalDateTime.now());
            //     refreshTokenRepository.save(token);
            // });
        }
    }

    private AuthResponse mapToDto(User user, String accessToken, String refreshToken) {
        // AuthResponse uses the old object schema for return mapping,
        // it doesn't have firstName and lastName, just the token and user details

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
