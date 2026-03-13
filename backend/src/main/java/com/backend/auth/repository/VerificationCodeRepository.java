package com.backend.auth.repository;

import com.backend.auth.entity.VerificationCode;
import com.backend.auth.entity.VerificationCodeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByIdentifierAndCodeAndType(String identifier, String code, VerificationCodeType type);
    void deleteByIdentifierAndType(String identifier, VerificationCodeType type);
}
